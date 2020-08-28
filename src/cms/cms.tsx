import CMS from 'netlify-cms-app'
import AktivitaetPagePreview from './preview-templates/AktivitaetPagePreview'
import SpendenPagePreview from './preview-templates/SpendenPagePreview'
var cloudinary = require('netlify-cms-media-library-cloudinary')

CMS.registerMediaLibrary(cloudinary);

CMS.registerPreviewTemplate('aktivitaetpost', AktivitaetPagePreview);
CMS.registerPreviewTemplate('spenden', SpendenPagePreview);

CMS.init();
