import { v2 as cloudinary } from 'cloudinary';
import pkg from 'multer-storage-cloudinary';
const { CloudinaryStorage } = pkg;
import multer from 'multer';
import { config } from 'dotenv';
config();

// Configure Cloudinary with credentials from .env
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Configure Multer to use Cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'ExpenseTrackerProfiles', // The folder name in Cloudinary
    allowed_formats: ['jpg', 'png', 'jpeg', 'webp'], // Allowed image formats
    transformation: [{ width: 500, height: 500, crop: 'limit' }] // Optional resizing
  }
});

const upload = multer({ storage: storage });

export { upload, cloudinary };
