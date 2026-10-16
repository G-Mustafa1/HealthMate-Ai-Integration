const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const reportStorage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: "HealthMate/reports",
        allowed_formats: ["pdf", "jpg", "png", "jpeg", "webp"],
    },
});

const MAX_REPORT_FILE_SIZE = 10 * 1024 * 1024; // 10 MB

const upload = multer({ storage: reportStorage, limits: { fileSize: MAX_REPORT_FILE_SIZE } });


const profilePictureStorage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: "HealthMate/profile-pictures",
        allowed_formats: ["jpg", "png", "jpeg", "webp"],
        transformation: [{ width: 500, height: 500, crop: "fill", gravity: "face" }],
    },
});


const MAX_PROFILE_PICTURE_SIZE = 2 * 1024 * 1024; // 2 MB

const uploadProfilePicture = multer({ storage: profilePictureStorage, limits: { fileSize: MAX_PROFILE_PICTURE_SIZE } });


module.exports = {
    upload,
    uploadProfilePicture,
    cloudinary
}