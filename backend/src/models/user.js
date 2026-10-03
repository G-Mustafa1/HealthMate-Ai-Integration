const mongoose = require('mongoose');
const validator = require('validator');
const { Schema } = mongoose;

const userSchema = new Schema(
    {
        firstname: {
            type: String,
            minLength: [3, "First name should be at least 3 characters"],
            maxLength: [30, "First name should not exceed 30 characters"],
            required: [true, "First name is required"],
            trim: true
        },
        lastname: {
            type: String,
            minLength: [3, "Last name should be at least 3 characters"],
            maxLength: [20, "Last name should not exceed 20 characters"],
            required: true
        },
        email: {
            type: String,
            index: true,
            unique: true,
            required: [true, "Email is required"],
            trim: true,
            lowercase: true,
            validate(value) {
                if (!validator.isEmail(value)) {
                    throw new Error("Invalid Email");
                }
            }
        },
        password: {
            type: String,
            required: [true, "Password is required"],
            minLength: 8,
            validate(value) {
                if (!validator.isStrongPassword(value)) {
                    throw new Error("Use Strong Password")
                }
            }
        },
        isEmailVerified: {
            type: Boolean,
            default: false,
        },
        emailOtp: {
            type: String,
            default: null
        },
        emailOtpExpires: {
            type: Date,
            default: null
        },
        resetOtp: {
            type: String,
            default: null
        },
        resetOtpExpires: {
            type: Date,
            default: null
        },
        gender: {
            type: String,
            enum: ["Male", "Female", "Other"],
            default: undefined
        }
    },
    {
        collection: 'users',
        timestamps: true
    }
);

const User = mongoose.model('User', userSchema);

module.exports = {
    User
}