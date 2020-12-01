import { Node } from "unist";
import path from "path";
import { mkdirSync, writeFileSync } from "fs";
import crypto from "crypto";
import AWS from "aws-sdk";
import { LexiconNameList, VoiceId } from "aws-sdk/clients/polly";

const AwsConfig = AWS.config;
import { AWSRegion } from "aws-sdk/clients/cur";
import { Cache, Reporter } from "gatsby";
import extractSpeechOutputBlocks, {
  SpeechOutputBlock,
} from "./internals/utils/extractSpeechOutputBlocks";

const getSpeechMarksCacheKey = (speechOutputId: string) =>
  `${speechOutputId}.json`;
const getAudioCacheKey = (speechOutputId: string) => `${speechOutputId}.mp3`;

const publicPath = "./public/tts/";

const getHash = (text: string) =>
  crypto
    .createHash("md5")
    .update(text)
    .digest("hex");

const hasTextChanged = (speechMarksJson: any, freshText: string) => {
  const textHashInFile = speechMarksJson.textHash;
  return getHash(freshText) !== textHashInFile;
};

const generateTtsFiles = async (
  pluginOptions: PluginOptions,
  speechOutputBlock: SpeechOutputBlock,
  cache: Cache,
  reporter: Reporter,
  s3: AWS.S3
) => {
  const Polly = new AWS.Polly({ apiVersion: "2016-06-10" });

  let ssmlTagsBeforeText = "";
  let ssmlTagsAfterText = "";
  const ssmlTagsToUse =
    speechOutputBlock.ssmlTags || pluginOptions.defaultSsmlTags;
  if (ssmlTagsToUse) {
    if (ssmlTagsToUse.indexOf("$SPEECH_OUTPUT_TEXT") === -1) {
      throw new Error(
        "If the 'defaultSsmlTags' option is defined it must contain the '$SPEECH_OUTPUT_TEXT' variable (see README file)."
      );
    }
    const matches = ssmlTagsToUse.match(/(.*)\$SPEECH_OUTPUT_TEXT(.*)/);
    if (!!matches) {
      ssmlTagsBeforeText = matches[1];
      ssmlTagsAfterText = matches[2];
    } else {
      throw new Error(
        "Invalid 'defaultSsmlTags' option defined. Check README file for more information about the option."
      );
    }
  }
  const textWithSsmlTags = `<speak>${ssmlTagsBeforeText}${speechOutputBlock.text}${ssmlTagsAfterText}</speak>`;

  const pollyBaseConfiguration = {
    VoiceId: speechOutputBlock.voiceId || pluginOptions.defaultVoiceId,
    LexiconNames:
      speechOutputBlock.lexiconNames || pluginOptions.defaultLexiconNames,
    TextType: "ssml",
    Text: textWithSsmlTags,
  };

  reporter.info(
    `(Re-)generating mp3 for SpeechOutput with ID: ${speechOutputBlock.id}`
  );
  const mp3Data = await Polly.synthesizeSpeech({
    OutputFormat: "mp3",
    ...pollyBaseConfiguration,
  }).promise();
  if (mp3Data.AudioStream instanceof Buffer) {
    cache.cache.set(
      getAudioCacheKey(speechOutputBlock.id),
      mp3Data.AudioStream
    );
    try {
      await s3.upload({
        Bucket: process.env.GATSBY_MDX_TTS_S3_BUCKET!,
        Key: `${speechOutputBlock.id}.mp3`,
        Body: mp3Data.AudioStream!
      }).promise();
    } catch (e) {
      reporter.error("MDX-TTS mp3 file could not be saved", e);
    }
  }

  reporter.info(
    `(Re-)generating speech marks for SpeechOutput with ID: ${speechOutputBlock.id}`
  );
  const jsonData = await Polly.synthesizeSpeech({
    OutputFormat: "json",
    SpeechMarkTypes: ["word"],
    ...pollyBaseConfiguration,
  }).promise();
  if (jsonData.AudioStream instanceof Buffer) {
    const speechMarks = jsonData.AudioStream.toString();
    const speechMarksJson = JSON.parse(
      `[${speechMarks.replace(/\}\n\{/g, "},{")}]`
    );
    // TODO: also check if SpeechOutput props have changed!
    const json = {
      textHash: getHash(speechOutputBlock.text),
      speechMarks: speechMarksJson,
    };
    cache.cache.set(getSpeechMarksCacheKey(speechOutputBlock.id), json);    
    try {
      await s3.upload({
        Bucket: process.env.GATSBY_MDX_TTS_S3_BUCKET!,
        Key: `${speechOutputBlock.id}.json`,
        Body: JSON.stringify(json)
      }).promise();
    } catch (e) {
      reporter.error("MDX-TTS speech mark file could not be saved", e);
    }
  }
};

const generateFiles = async (
  speechOutputBlocks: SpeechOutputBlock[],
  pluginOptions: PluginOptions,
  cache: Cache,
  reporter: Reporter
) => {
  // TODO: move AWS and Polly initialization out of this loop but only initialize if actually some text has changed
  AwsConfig.update({
    region: pluginOptions.awsRegion,
    ...(pluginOptions.awsCredentials && {
      credentials: {
        accessKeyId: pluginOptions.awsCredentials.accessKeyId,
        secretAccessKey: pluginOptions.awsCredentials.secretAccessKey,
      },
    }),
  });

  const s3 = new AWS.S3({ apiVersion: "2016-06-10" });

  for (let i = 0; i < speechOutputBlocks.length; i++) {
    const speechOutputBlock = speechOutputBlocks[i];

    let speechMarks = await cache.cache.get(
      getSpeechMarksCacheKey(speechOutputBlock.id)
    );
    const audio = await cache.cache.get(getAudioCacheKey(speechOutputBlock.id));

    let filesAlreadyExist = speechMarks && audio;
    if (
      !filesAlreadyExist ||
      hasTextChanged(speechMarks, speechOutputBlock.text)
      // TODO: also check if SpeechOutput props have changed!
    ) {
      try {
        const s3audio = await s3
          .getObject({
            Bucket: process.env.GATSBY_MDX_TTS_S3_BUCKET!,
            Key: `${speechOutputBlock.id}.mp3`,
          })
          .promise();
        const s3speechmarks = await s3
          .getObject({
            Bucket: process.env.GATSBY_MDX_TTS_S3_BUCKET!,
            Key: `${speechOutputBlock.id}.json`,
          })
          .promise();
        reporter.info(
          `Found S3 cached audio/speechmarks for ${speechOutputBlock.id}`
        );
        filesAlreadyExist = true;
        cache.cache.set(getAudioCacheKey(speechOutputBlock.id), s3audio.Body!);
        speechMarks = JSON.parse(s3speechmarks.Body!.toString());
        cache.cache.set(getSpeechMarksCacheKey(speechOutputBlock.id), speechMarks);
      } catch (e) {
        reporter.info(e);
      }
    }

    if (
      !filesAlreadyExist ||
      hasTextChanged(speechMarks, speechOutputBlock.text)
      // TODO: also check if SpeechOutput props have changed!
    ) {
      await generateTtsFiles(pluginOptions, speechOutputBlock, cache, reporter, s3);
    }

    const eventuallyRegeneratedSpeechMarks = await cache.cache.get(
      getSpeechMarksCacheKey(speechOutputBlock.id)
    );

    const eventuallyRegeneratedAudio = await cache.cache.get(
      getAudioCacheKey(speechOutputBlock.id)
    );

    mkdirSync(publicPath, { recursive: true });
    writeFileSync(
      path.join(publicPath, `${speechOutputBlock.id}.mp3`),
      eventuallyRegeneratedAudio
    );
    writeFileSync(
      path.join(publicPath, `${speechOutputBlock.id}.json`),
      JSON.stringify(eventuallyRegeneratedSpeechMarks)
    );
  }
};

interface Parameters {
  markdownAST: Node;
  cache: Cache;
  reporter: Reporter;
}

interface PluginOptions {
  awsRegion: AWSRegion;
  defaultVoiceId: VoiceId;
  awsCredentials?: {
    accessKeyId: string;
    secretAccessKey: string;
  };
  defaultSsmlTags?: string;
  defaultLexiconNames?: LexiconNameList;
  ignoredCharactersRegex?: RegExp;
  speechOutputComponentNames?: string[];
}

module.exports = async (
  parameters: Parameters,
  pluginOptions: PluginOptions
) => {
  const speechOutputBlocks = extractSpeechOutputBlocks(
    parameters.markdownAST,
    pluginOptions.speechOutputComponentNames || ["SpeechOutput"],
    pluginOptions.ignoredCharactersRegex
  );

  if (speechOutputBlocks.length > 0) {
    await generateFiles(
      speechOutputBlocks,
      pluginOptions,
      parameters.cache,
      parameters.reporter
    );
  }

  return parameters.markdownAST;
};

// TODO: make sure if a certain text is no longer existing, related files are deleted as well!
