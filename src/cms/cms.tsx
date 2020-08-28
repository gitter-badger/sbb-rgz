import CMS from 'netlify-cms-app'
import AktivitaetPagePreview from './preview-templates/AktivitaetPagePreview'
import SpendenPagePreview from './preview-templates/SpendenPagePreview'
import ImpressumPagePreview from './preview-templates/ImpressumPagePreview';
import UeberUnsPagePreview from './preview-templates/UeberUnsPagePreview';
import TalentPagePreview from './preview-templates/TalentPagePreview';
import KochrezeptPagePreview from './preview-templates/KochrezeptPagePreview';

CMS.registerPreviewTemplate('aktivitaetpost', AktivitaetPagePreview);
CMS.registerPreviewTemplate('spenden', SpendenPagePreview);
CMS.registerPreviewTemplate('impressum', ImpressumPagePreview);
CMS.registerPreviewTemplate('ueberuns', UeberUnsPagePreview);
CMS.registerPreviewTemplate('talente', TalentPagePreview);
CMS.registerPreviewTemplate('kochrezepte', KochrezeptPagePreview);