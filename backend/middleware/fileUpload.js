const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Define all upload directories
const UPLOAD_DIRS = {
  images: path.join(__dirname, '../uploads/images'),
  specs: path.join(__dirname, '../uploads/specs'),
  msds: path.join(__dirname, '../uploads/msds'),
  catalogues: path.join(__dirname, '../catalogues'),
  photos: path.join(__dirname, '../images')
};

// Create all necessary directories
const createUploadDirs = () => {
  Object.values(UPLOAD_DIRS).forEach(dir => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  });
};

createUploadDirs();

// Set up storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let uploadDir;
    
    switch (file.fieldname) {
      case 'spec':
        uploadDir = UPLOAD_DIRS.specs;
        break;
      case 'msds':
        uploadDir = UPLOAD_DIRS.msds;
        break;
      case 'catalogue':
        uploadDir = UPLOAD_DIRS.catalogues;
        break;
      case 'photo':
        uploadDir = UPLOAD_DIRS.photos;
        break;
      default:
        uploadDir = UPLOAD_DIRS.images;
    }
    
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    if (file.fieldname === 'catalogue') {
      // Keep original filename for catalogues
      const fileName = file.originalname;
      req.fileName = fileName; // Store for later reference
      cb(null, fileName);
    } else {
      // Generate unique filename for other files
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, `${file.fieldname}-${uniqueSuffix}${path.extname(file.originalname)}`);
    }
  }
});

// Enhanced file filter function
const fileFilter = (req, file, cb) => {
  switch (file.fieldname) {
    case 'images':
    case 'photo':
      if (!file.mimetype.startsWith('image/')) {
        return cb(new Error('Only image files are allowed for images and photos!'), false);
      }
      break;
    case 'spec':
    case 'msds':
      if (file.mimetype !== 'application/pdf') {
        return cb(new Error('Only PDF files are allowed for specs and MSDS!'), false);
      }
      break;
    case 'catalogue':
      // Add specific catalogue file type restrictions if needed
      break;
    default:
      return cb(new Error('Invalid field name!'), false);
  }
  cb(null, true);
};

// Configure multer with all possible fields
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 50 * 1024 * 1024, // Increased to 50MB to accommodate catalogues
  }
}).fields([
  { name: 'images', maxCount: 10 },
  { name: 'spec', maxCount: 1 },
  { name: 'msds', maxCount: 1 },
  { name: 'catalogue', maxCount: 1 },
  { name: 'photo', maxCount: 5 }
]);

// Enhanced middleware to handle uploads
const uploadPhoto = (req, res, next) => {
  upload(req, res, function(err) {
    if (err instanceof multer.MulterError) {
      console.error('Multer error:', err);
      return res.status(400).json({
        success: false,
        message: `Upload error: ${err.message}`,
        error: err
      });
    } else if (err) {
      console.error('Unknown upload error:', err);
      return res.status(500).json({
        success: false,
        message: `Upload error: ${err.message}`,
        error: err
      });
    }
    next();
  });
};

module.exports = {
  uploadPhoto,
  UPLOAD_DIRS
};


