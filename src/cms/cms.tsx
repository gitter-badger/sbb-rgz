import CMS from 'netlify-cms-app'
var uploadcare = require('netlify-cms-media-library-uploadcare')
var cloudinary = require('netlify-cms-media-library-cloudinary')

CMS.registerMediaLibrary(uploadcare)
CMS.registerMediaLibrary(cloudinary)
