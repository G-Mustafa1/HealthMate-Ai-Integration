const express = require('express');
const profileRouter = express.Router();
const { User } = require('../models/user');
const { userAuth } = require('../middleware/authmiddle');
const { Profile } = require('../models/Profile');
const { uploadProfilePicture, cloudinary } = require('../cloudinary/cloudinary');
const myCache = require('../config/cach');

const USER_PUBLIC_FIELDS = '-password -emailOtp -emailOtpExpires -resetOtp -resetOtpExpires';

// Convert empty strings to null so optional fields can be cleared
const toNull = (value) =>
    value === undefined || value === null || String(value).trim() === '' ? null : String(value).trim();

// Destroy newly uploaded file when it will NOT be saved to DB
const removeUploadedFile = async (req) => {
    if (!req.file) return;

    try {
        await cloudinary.uploader.destroy(req.file.filename, { resource_type: 'image' });
    } catch (err) {
        console.warn('Cloudinary delete error:', err.message);
    }
};

// Wrap multer so size-limit errors return JSON instead of HTML
const uploadProfilePictureFile = (req, res, next) => {
    uploadProfilePicture.single('profilePicture')(req, res, (err) => {
        if (err) {
            if (err.code === 'LIMIT_FILE_SIZE') {
                return res.status(413).json({
                    success: false,
                    message: 'Image is too large. Maximum allowed size is 2MB.'
                });
            }

            return res.status(400).json({
                success: false,
                message: err.message || 'Image upload failed'
            });
        }

        next();
    });
};



profileRouter.get("/getuser", userAuth, async (req, res) => {
    try {
        const user = req.user;

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "User not authenticated",
            });
        }

        const cacheKey = `user:${user._id}`;

        // Cache hit: database query ki zaroorat nahi
        const cachedUser = myCache.get(cacheKey);

        if (cachedUser) {
            return res.status(200).json({
                success: true,
                user: cachedUser,
            });
        }

        const profile = await Profile.findOne({ user: user._id, }).select("profilePicture").lean();

        const profilePicture =
            profile?.profilePicture?.url ??
            (typeof profile?.profilePicture === "string"
                ? profile.profilePicture
                : null);

        const userData = {
            id: user._id,
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
            isEmailVerified: user.isEmailVerified,
            profilePicture,
        };

        // Cache set; response is not dependent on background work
        myCache.set(cacheKey, userData);

        return res.status(200).json({
            success: true,
            user: userData,
        });
    } catch (error) {
        console.error("Error fetching user:", error);

        return res.status(500).json({
            success: false,
            message: "Error fetching user",
        });
    }
});


profileRouter.get('/getallusers', userAuth, async (req, res) => {
    try {
        const users = await User.find({}).select(USER_PUBLIC_FIELDS);

        if (!users) {
            return res.status(404).json({ message: 'Users not found' });
        }

        res.status(200).json(users);
    } catch (error) {
        console.error('Error fetching all users:', error);
        res.status(500).json({ success: false, message: 'Error fetching all users', error: error.message });
    }
})


profileRouter.get('/user', userAuth, async (req, res) => {
    try {
        const userId = req.user._id;

        const user = await User.findById(userId).select(USER_PUBLIC_FIELDS);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const profile = await Profile.findOne({ user: userId });

        res.status(200).json({
            success: true,
            user,
            profile: profile || null
        });

    } catch (error) {
        console.error('Error fetching user and profile:', error);

        res.status(500).json({ success: false, error: error.message });
    }
});


profileRouter.put('/edituser', userAuth, uploadProfilePictureFile, async (req, res) => {
    let profileSaved = false;

    try {

        const userId = req.user._id;

        const { firstname, lastname, phone, gender, dateOfBirth, country, city, bloodGroup, removeProfilePicture } = req.body;


        // FIRST NAME & LAST NAME

        if (!firstname || !firstname.trim() || !lastname || !lastname.trim()) {
            await removeUploadedFile(req);

            return res.status(400).json({
                success: false,
                message: "First name and Last name are required"
            });
        }

        // GENDER

        const genderValue = toNull(gender);

        if (genderValue && !["Male", "Female", "Other"].includes(genderValue)) {
            await removeUploadedFile(req);

            return res.status(400).json({
                success: false,
                message: "Invalid gender"
            });
        }


        // DATE OF BIRTH

        const dobValue = toNull(dateOfBirth);

        if (dobValue && isNaN(Date.parse(dobValue))) {
            await removeUploadedFile(req);

            return res.status(400).json({
                success: false,
                message: "Invalid date of birth"
            });
        }


        // BLOOD GROUP

        const bloodGroupValue = toNull(bloodGroup);

        if (bloodGroupValue && !["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].includes(bloodGroupValue)) {
            await removeUploadedFile(req);

            return res.status(400).json({
                success: false,
                message: "Invalid blood group"
            });
        }


        // PHONE

        const phoneValue = toNull(phone);

        if (phoneValue && !/^\+?[0-9\-()\s]{7,20}$/.test(phoneValue)) {
            await removeUploadedFile(req);

            return res.status(400).json({
                success: false,
                message: "Invalid phone number"
            });
        }

        const countryValue = toNull(country);
        const cityValue = toNull(city);

        if ((countryValue && countryValue.length > 50) || (cityValue && cityValue.length > 50)) {
            await removeUploadedFile(req);

            return res.status(400).json({
                success: false,
                message: "Country and city must be under 50 characters"
            });
        }

        // UPDATE USER

        const updateUser = await User.findByIdAndUpdate(
            userId,
            { $set: { firstname: firstname.trim(), lastname: lastname.trim() } },
            { new: true, runValidators: true }
        ).select(USER_PUBLIC_FIELDS);

        if (!updateUser) {
            await removeUploadedFile(req);

            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        // UPDATE PROFILE

        // PROFILE DATA
        const profileData = {
            phone: phoneValue,
            gender: genderValue,
            dateOfBirth: dobValue,
            country: countryValue,
            city: cityValue,
            bloodGroup: bloodGroupValue
        };

        const existingProfile = await Profile.findOne({ user: userId });

        // PROFILE PICTURE (model expects { url, publicId })
        if (req.file) {
            profileData.profilePicture = {
                url: req.file.path,
                publicId: req.file.filename
            };
        } else if (removeProfilePicture === 'true') {
            profileData.profilePicture = { url: null, publicId: null };
        }

        const updateProfile = await Profile.findOneAndUpdate(
            { user: userId },
            { $set: profileData },
            { new: true, runValidators: true, upsert: true }
        );

        if (!updateProfile) {
            await removeUploadedFile(req);

            return res.status(404).json({
                success: false,
                message: "Profile not found"
            });
        }

        profileSaved = true;

        // Destroy OLD Cloudinary image only after DB save (replace or remove)
        const pictureChanged = Boolean(req.file) || removeProfilePicture === 'true';
        const oldPublicId = existingProfile?.profilePicture?.publicId;
        const newPublicId = req.file ? req.file.filename : null;

        if (pictureChanged && oldPublicId && oldPublicId !== newPublicId) {
            cloudinary.uploader.destroy(oldPublicId, { resource_type: 'image' }).catch((err) => {
                console.warn('Cloudinary delete error:', err.message);
            });
        }

        // Purana cached user ab stale hai (naam / profile picture badal gaya)
        myCache.del(`user:${userId}`);

        return res.status(200).json({
            success: true,
            message: "Profile updated successfully",
            user: updateUser,
            profile: updateProfile.toObject()
        });

    } catch (error) {

        console.error("❌ Edit Profile Error:", error);

        if (!profileSaved) {
            await removeUploadedFile(req);
        }

        return res.status(500).json({
            success: false,
            message: error.message || "Failed to update profile",
        });
    }
});


module.exports = {
    profileRouter
}
