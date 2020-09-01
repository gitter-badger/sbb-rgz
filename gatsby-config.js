require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`
})

module.exports = {
  siteMetadata: {
    title: 'Schweizerischer Blindenbund RGZ',
    description:
      'Webseite der Regionalgruppe Zürich des Schweizerischen Blindenbunds',
    siteUrl: `https://www.rgz-blind.ch`
  },
  plugins: [    
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    'gatsby-plugin-robots-txt',
    `gatsby-plugin-sitemap`,
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-typescript',
    'gatsby-plugin-sass',
    {
      // keep as first gatsby-source-filesystem plugin for gatsby image support
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/static/uploads`,
        name: 'uploads',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/content/posts`,
        name: 'posts',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/img`,
        name: 'images',
      },
    },
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: [`.mdx`, `.md`],
        gatsbyRemarkPlugins: [
          {
            resolve: 'gatsby-remark-relative-images',
            options: {
              name: 'uploads',
            },
          },
          {
            resolve: 'gatsby-remark-images',
            options: {
              // It's important to specify the maxWidth (in pixels) of
              // the content container as this plugin uses this as the
              // base for generating different widths of each image.
              maxWidth: 2048,
            },
          },
          {
            resolve: 'gatsby-remark-copy-linked-files',
            options: {
              destinationDir: 'static',
            },
          },
          {
            resolve: "gatsby-mdx-tts",
            options: {
              awsRegion: "eu-central-1",
              defaultVoiceId: "Marlene",
              awsCredentials: {
                accessKeyId: process.env.GATSBY_AWS_ACCESS_KEY_ID,
                secretAccessKey: process.env.GATSBY_AWS_SECRET_ACCESS_KEY,
              }
            },
          }
        ],
      },
    },
    {
      resolve: "gatsby-plugin-use-dark-mode",
      options: {
        classNameDark: "dark-mode",
        classNameLight: "light-mode",
        storageKey: "darkMode",
        minify: true,
      },
    },
    {
      resolve: 'gatsby-plugin-netlify-cms',
      options: {
        modulePath: `${__dirname}/src/cms/cms.tsx`,
      },
    },
    'gatsby-plugin-netlify', // make sure to keep it last in the array
  ],
}
