import CMS from 'netlify-cms-app'
import AktivitaetPagePreview from './preview-templates/AktivitaetPagePreview'
import SpendenPagePreview from './preview-templates/SpendenPagePreview'
import ImpressumPagePreview from './preview-templates/ImpressumPagePreview';
import UeberUnsPagePreview from './preview-templates/UeberUnsPagePreview';
import KochrezeptPagePreview from './preview-templates/KochrezeptPagePreview';
import PortraitPagePreview from './preview-templates/PortraitPagePreview';

CMS.registerPreviewTemplate('aktivitaetpost', AktivitaetPagePreview);
CMS.registerPreviewTemplate('spenden', SpendenPagePreview);
CMS.registerPreviewTemplate('impressum', ImpressumPagePreview);
CMS.registerPreviewTemplate('ueberuns', UeberUnsPagePreview);
CMS.registerPreviewTemplate('portraits', PortraitPagePreview);
CMS.registerPreviewTemplate('kochrezepte', KochrezeptPagePreview);