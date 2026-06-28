// config/multerConfig.js or middleware/upload.js
const multer = require('multer');

// Configure storage (memory storage - file stored in RAM as buffer)
const storage = multer.memoryStorage();

// File filter function - validate file types
const fileFilter = (req, file, cb) => {
  // Allowed file types
  const allowedTypes = [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  ];
  
  if (allowedTypes.includes(file.mimetype)) {
    // Accept the file
    cb(null, true);
  } else {
    // Reject the file
    cb(new Error('Invalid file type. Only PDF, DOC, and DOCX files are allowed.'), false);
  }
};

// Multer configuration
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB in bytes
  },
  fileFilter: fileFilter
});

module.exports = upload;