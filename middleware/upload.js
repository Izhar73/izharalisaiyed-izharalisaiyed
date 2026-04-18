const multer = require('multer');
const { supportedInputMimeTypes } = require('../services/imageService');

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  if (supportedInputMimeTypes.has(file.mimetype)) {
    return cb(null, true);
  }

  return cb(new Error('Only image files are allowed'));
};

const upload = multer({
  storage,
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB
  },
  fileFilter
});

module.exports = upload;
