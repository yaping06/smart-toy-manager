const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

// Connects to your .env credentials
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Configures how the images are stored
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "lucas_toys",
    resource_type: "image",
    allowed_formats: ["jpg", "jpeg", "png", "heic", "heif"],
    transformation: [
      { width: 1000, crop: "limit" },
      { fetch_format: "jpg" }
    ],
  },
});

const upload = multer({ storage: storage });
module.exports = upload;