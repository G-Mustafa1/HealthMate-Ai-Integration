const mongoose = require("mongoose");
const { Schema } = mongoose;

const profileSchema = new Schema(
    {
        // USER REFERENCE
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: [true, "User is required"],
            index: true,
        },

        // PROFILE INFORMATION
        profilePicture: {
            url: {
                type: String,
                default: null
            },
            publicId: {
                type: String,
                default: null
            }
        },
        phone: {
            type: String,
            default: null,
            trim: true,
        },

        gender: {
            type: String,
            enum: ["Male", "Female", "Other"],
            default: null,
        },

        dateOfBirth: {
            type: Date,
            default: null,
        },

        country: {
            type: String,
            default: null,
            trim: true,
        },

        city: {
            type: String,
            default: null,
            trim: true,
        },

        // HEALTH PROFILE
        bloodGroup: {
            type: String,
            enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-",],
            default: null,
        },
    },
    {
        collection: "profiles",
        timestamps: true,
    }
);

const Profile = mongoose.model("Profile", profileSchema);

module.exports = {
    Profile,
};
