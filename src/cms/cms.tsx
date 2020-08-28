import CMS from 'netlify-cms-app'
import AktivitaetPagePreview from './preview-templates/AktivitaetPagePreview'
import SpendenPagePreview from './preview-templates/SpendenPagePreview'
var uploadcare = require('netlify-cms-media-library-uploadcare')
var cloudinary = require('netlify-cms-media-library-cloudinary')

CMS.registerMediaLibrary(uploadcare)
//CMS.registerMediaLibrary(cloudinary)

CMS.registerPreviewTemplate('aktivitaetpost', AktivitaetPagePreview)
CMS.registerPreviewTemplate('spenden', SpendenPagePreview)
