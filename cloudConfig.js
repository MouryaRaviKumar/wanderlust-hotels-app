// Cloudinary configuration and Multer storage setup
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

// Configure Cloudinary with environment variables
cloudinary.config({
    cloud_name : process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret : process.env.CLOUD_API_SECRET
});

// Define storage strategy for uploads (folder, formats, filename)
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'wanderlust_DEV',
    allowedFormats : ["png","jpg","jpeg"],
    public_id: (req, file) => 'computed-filename-using-request',
  },
});

// Export Cloudinary and storage for use in other modules
module.exports = {
    cloudinary,
    storage
};
