const multer = require('multer');
const path = require('path');
const fs = require('fs');

function createUploadMiddleware(folderName) {
  const UPLOAD_DIR = path.join(__dirname, '..', 'uploads', folderName);
  fs.mkdirSync(UPLOAD_DIR, { recursive: true });

  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, UPLOAD_DIR);
    },
    filename: function (req, file, cb) {
      const uniqueName = `${Date.now()}-${Math.round(Math.random()*1e9)}${path.extname(file.originalname)}`;
      cb(null, uniqueName);
    }
  });

  function fileFilter (req, file, cb) {
    if (!file.mimetype.startsWith('image/')) return cb(new Error('Only image files are allowed!'), false);
    cb(null, true);
  }

  return multer({ storage, fileFilter, limits: { fileSize: 10 * 1024 * 1024 } }); 
}

module.exports = createUploadMiddleware;
