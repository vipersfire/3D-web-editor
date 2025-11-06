import multer from 'multer';

// Use memory storage since we'll upload directly to cloud storage
const storage = multer.memoryStorage();

// File filter for images
const imageFilter = (
  req: Express.Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed'));
  }
};

// Configure multer
export const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
  fileFilter: imageFilter,
});
