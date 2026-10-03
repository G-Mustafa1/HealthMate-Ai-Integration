const express = require('express');
const authRouter = express.Router();

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const validator = require('validator');

const { User } = require('../models/user');
const { Secession } = require('../models/Secession');

const { generateOTP } = require('../utils/otp');

const { sendSignupOTP, sendLoginNotification, sendForgotPasswordOTP, sendPasswordChangedEmail } = require('../utils/sendEmail');

const { generateAccessToken, generateRefreshToken } = require('../utils/token');

// const getCookieOptions = (extraOptions = {}) => {
//     const isProduction = process.env.NODE_ENV === "production";
//     return {
//         httpOnly: true,
//         secure: isProduction,
//         sameSite: isProduction ? "none" : "lax",
//         path: "/",
//         ...extraOptions
//     };
// };


const getCookieOptions = (extraOptions = {}) => {
    return {
        httpOnly: true,
        secure: true, // Set to true in production
        sameSite: "none", // Set to "none" in production
        path: "/",
        ...extraOptions
    };
};


// SIGNUP

authRouter.post('/signup', async (req, res) => {
    try {
        const { firstname, lastname, email, password } = req.body;

        if (!firstname || firstname.length < 3) {
            return res.status(400).json({
                success: false,
                error: "First name is required and must be at least 2 characters long"
            });
        }

        if (!lastname || lastname.length < 3) {
            return res.status(400).json({
                success: false,
                error: "Last name is required and must be at least 2 characters long"
            });
        }

        if (!email) {
            return res.status(400).json({
                success: false,
                error: "Email is required"
            });
        }

        if (!password) {
            return res.status(400).json({
                success: false,
                error: "Password is required"
            });
        }

        if (!validator.isEmail(email)) {
            return res.status(400).json({
                success: false,
                error: "Invalid email format"
            });
        }

        if (!validator.isStrongPassword(password)) {
            return res.status(400).json({
                success: false,
                error: "Password must be strong (min 8 chars, uppercase, number, symbol)"
            });
        }


        const existingUser = await User.findOne({ email });

        // Existing user
        if (existingUser) {

            // Already verified
            if (existingUser.isEmailVerified) {
                return res.status(400).json({
                    success: false,
                    error: "Email already registered please login"
                });
            }

            // Generate new OTP
            const otp = generateOTP();

            existingUser.emailOtp = otp;
            existingUser.emailOtpExpires = new Date(
                Date.now() + 10 * 60 * 1000
            );

            await existingUser.save();

            await sendSignupOTP(existingUser.email, otp);

            return res.status(200).json({
                success: true,
                message: "New OTP sent to your email"
            });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, Number(process.env.HASH_PASS));

        // Generate OTP
        const otp = generateOTP();

        const otpExpires = new Date(Date.now() + 10 * 60 * 1000);

        // Create user
        const newUser = new User({
            firstname,
            lastname,
            email,
            password: hashedPassword,
            isEmailVerified: false,
            emailOtp: otp,
            emailOtpExpires: otpExpires
        });

        await newUser.save();

        // Send OTP
        await sendSignupOTP(email, otp);

        return res.status(201).json({
            success: true,
            message: "OTP sent to your email",
            user: {
                id: newUser._id,
                firstname: newUser.firstname,
                lastname: newUser.lastname,
                email: newUser.email
            }
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            error: "Server error during signup"
        });
    }
});


// VERIFY EMAIL OTP

authRouter.post('/verify-email-otp', async (req, res) => {
    try {
        const { email, otp } = req.body;

        if (!email || !otp) {
            return res.status(400).json({
                success: false,
                error: "Email and OTP are required"
            });
        }


        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({
                success: false,
                error: "User not found"
            });
        }

        if (user.isEmailVerified) {
            return res.status(400).json({
                success: false,
                error: "Email already verified"
            });
        }

        if (!user.emailOtp || !user.emailOtpExpires) {
            return res.status(400).json({
                success: false,
                error: "OTP not found or expired"
            });
        }

        // Check expiry
        if (user.emailOtpExpires < new Date()) {

            user.emailOtp = null;
            user.emailOtpExpires = null;

            await user.save();

            return res.status(400).json({
                success: false,
                error: "OTP expired"
            });
        }

        // Check OTP
        if (String(otp) !== String(user.emailOtp)) {
            return res.status(400).json({
                success: false,
                error: "Invalid OTP"
            });
        }

        // Verify email
        user.isEmailVerified = true;
        user.emailOtp = null;
        user.emailOtpExpires = null;

        await user.save();

        return res.status(200).json({
            success: true,
            message: "Email verified successfully. Please login.",
            user: {
                id: user._id,
                firstname: user.firstname,
                lastname: user.lastname,
                email: user.email
            }
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            error: "Server error during email verification"
        });
    }
});


// RESEND EMAIL OTP

authRouter.post('/resend-email-otp', async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({
                success: false,
                error: "Email is required"
            });
        }


        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({
                success: false,
                error: "User not found"
            });
        }

        if (user.isEmailVerified) {
            return res.status(400).json({
                success: false,
                error: "Email is already verified"
            });
        }

        const otp = generateOTP();

        user.emailOtp = otp;
        user.emailOtpExpires = new Date(Date.now() + 10 * 60 * 1000);

        await user.save();

        try {

            await sendSignupOTP(user.email, otp);

        } catch (error) {

            console.error("❌ Resend Email OTP Error:", error.message);

            return res.status(500).json({
                success: false,
                error: "Failed to send OTP email"
            });
        }

        return res.status(200).json({
            success: true,
            message: "New verification OTP sent to your email"
        });

    } catch (error) {

        console.error("❌ Resend Email OTP Error:", error.message);

        return res.status(500).json({
            success: false,
            error: "Error while resending OTP"
        });
    }
});


// LOGIN

authRouter.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                error: "Email and password are required"
            });
        }


        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({
                success: false,
                error: "User not found, signup first"
            });
        }

        if (!user.isEmailVerified) {
            return res.status(401).json({
                success: false,
                error: "Please verify your email first"
            });
        }

        // Check password
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({
                success: false,
                error: "Invalid credentials"
            });
        }

        // GENERATE TOKENS

        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user);

        // CREATE / UPDATE SESSION (upsert — prevents session accumulation)

        await Secession.findOneAndUpdate(
            { userId: user._id },
            {
                userId: user._id,
                refreshToken,
                expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000)
            },
            {
                upsert: true,
                new: true
            }
        );

        // ACCESS TOKEN COOKIE

        res.cookie("accessToken", accessToken, getCookieOptions({
            maxAge: 15 * 60 * 1000
        }));

        // REFRESH TOKEN COOKIE

        res.cookie("refreshToken", refreshToken, getCookieOptions({
            maxAge: 24 * 60 * 60 * 1000
        }));

        // Login notification
        sendLoginNotification(user.email).catch(error => {

            console.error("❌ Login notification email error:", error.message);

        });

        return res.status(200).json({
            success: true,
            message: "Login successful",
            user: {
                id: user._id,
                firstname: user.firstname,
                lastname: user.lastname,
                email: user.email,
                isEmailVerified: user.isEmailVerified
            }
        });

    } catch (error) {

        console.error(
            "❌ Error during login:",
            error.message
        );

        return res.status(500).json({
            success: false,
            error: "Error during login"
        });
    }
});


// REFRESH TOKEN

authRouter.post('/refresh', async (req, res) => {
    try {

        // Get refresh token from cookie
        const refreshToken = req.cookies?.refreshToken;

        if (!refreshToken) {
            return res.status(401).json({
                success: false,
                error: "Refresh token required"
            });
        }

        let decoded;

        // VERIFY REFRESH TOKEN

        try {

            decoded = jwt.verify(
                refreshToken,
                process.env.REFRESH_TOKEN_SECRET
            );

        } catch (error) {

            return res.status(401).json({
                success: false,
                error: "Invalid or expired refresh token"
            });
        }

        // CHECK TOKEN TYPE

        if (decoded.type !== "refresh") {

            return res.status(401).json({
                success: false,
                error: "Invalid refresh token"
            });
        }

        // FIND SESSION

        const session = await Secession.findOne({
            userId: decoded.id,
            refreshToken: refreshToken
        });

        if (!session) {
            return res.status(401).json({
                success: false,
                error: "Session not found"
            });
        }

        // CHECK SESSION EXPIRY

        if (session.expiresAt < new Date()) {

            await Secession.deleteOne({ _id: session._id });

            return res.status(401).json({
                success: false,
                error: "Session expired"
            });
        }

        // FIND USER

        const user = await User.findById(decoded.id);

        if (!user) {

            await Secession.deleteOne({ _id: session._id });

            return res.status(401).json({
                success: false,
                error: "User not found"
            });
        }

        // GENERATE NEW TOKENS

        const newAccessToken = generateAccessToken(user);

        const newRefreshToken = generateRefreshToken(user);

        // ROTATE REFRESH TOKEN

        session.refreshToken = newRefreshToken;

        session.expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);

        await session.save();

        // SET NEW ACCESS TOKEN

        res.cookie("accessToken", newAccessToken, getCookieOptions({
            maxAge: 15 * 60 * 1000
        }));

        // SET NEW REFRESH TOKEN

        res.cookie("refreshToken", newRefreshToken, getCookieOptions({
            maxAge: 24 * 60 * 60 * 1000
        }));

        return res.status(200).json({
            success: true,
            message: "Token refreshed successfully"
        });

    } catch (error) {

        console.error("❌ Refresh Token Error:", error);

        return res.status(500).json({
            success: false,
            error: "Error refreshing token"
        });
    }
});


// FORGOT PASSWORD

authRouter.post('/forgot-password', async (req, res) => {
    try {

        const { email } = req.body;

        if (!email) {
            return res.status(400).json({
                success: false,
                error: "Email is required"
            });
        }


        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({
                success: false,
                error: "User not found"
            });
        }

        if (!user.isEmailVerified) {
            return res.status(400).json({
                success: false,
                error: "Please verify your email"
            });
        }

        const otp = generateOTP();

        user.resetOtp = otp;

        user.resetOtpExpires = new Date(Date.now() + 10 * 60 * 1000);

        await user.save();

        try {

            // await sendForgotPasswordOTP(user.email, otp);

        } catch (emailError) {

            console.error("❌ Forgot Password Email Error:", emailError.message);

            return res.status(500).json({
                success: false,
                error: "Failed to send OTP email"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Password reset OTP sent to your email",
            email: user.email
        });

    } catch (error) {

        console.error("❌ Forgot Password Error:", error.message);

        return res.status(500).json({
            success: false,
            error: "Error during forgot password"
        });
    }
});


// VERIFY RESET OTP

authRouter.post('/verify-reset-otp', async (req, res) => {
    try {

        const { email, otp } = req.body;

        if (!email || !otp) {
            return res.status(400).json({
                success: false,
                error: "Email and OTP are required"
            });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({
                success: false,
                error: "User not found"
            });
        }

        if (!user.resetOtp || !user.resetOtpExpires) {
            return res.status(400).json({
                success: false,
                error: "Invalid or expired reset OTP"
            });
        }

        if (user.resetOtpExpires < new Date()) {

            user.resetOtp = null;
            user.resetOtpExpires = null;

            await user.save();

            return res.status(400).json({
                success: false,
                error: "Reset OTP has expired"
            });
        }

        if (String(otp) !== String(user.resetOtp)) {
            return res.status(400).json({
                success: false,
                error: "Invalid reset OTP"
            });
        }

        user.resetOtp = null;
        user.resetOtpExpires = null;

        await user.save();

        return res.status(200).json({
            success: true,
            message: "OTP verified successfully"
        });

    } catch (error) {

        console.error("❌ Verify Reset OTP Error:", error.message);

        return res.status(500).json({
            success: false,
            error: "Error during verify reset OTP"
        });
    }
});


// RESEND RESET OTP

authRouter.post('/resend-reset-otp', async (req, res) => {
    try {

        const { email } = req.body;

        if (!email) {
            return res.status(400).json({
                success: false,
                error: "Email is required"
            });
        }


        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({
                success: false,
                error: "User not found"
            });
        }

        const otp = generateOTP();

        user.resetOtp = otp;

        user.resetOtpExpires = new Date(Date.now() + 10 * 60 * 1000);

        await user.save();

        try {

            // await sendForgotPasswordOTP(user.email, otp);

        } catch (emailError) {

            console.error("❌ Resend Reset Password Email Error:", emailError.message);
            return res.status(500).json({
                success: false,
                error: "Failed to send OTP email"
            });
        }

        return res.status(200).json({
            success: true,
            message: "New reset OTP sent to your email",
            email: user.email
        });

    } catch (error) {

        console.error("❌ Resend Reset Password Error:", error.message);

        return res.status(500).json({
            success: false,
            error: "Error during resend reset password"
        });
    }
});


// RESET PASSWORD

authRouter.post('/reset-password', async (req, res) => {
    try {

        const { email, newPassword, confirmPassword } = req.body;

        if (!email) {
            return res.status(400).json({
                success: false,
                error: "Email is required"
            });
        }

        if (!newPassword || !confirmPassword) {
            return res.status(400).json({
                success: false,
                error: "New password and confirm password are required"
            });
        }

        if (!validator.isStrongPassword(newPassword)) {
            return res.status(400).json({
                success: false,
                error: "Password must be strong (min 8 chars, uppercase, number, symbol)"
            });
        }

        if (newPassword !== confirmPassword) {
            return res.status(400).json({
                success: false,
                error: "Passwords do not match"
            });
        }


        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({
                success: false,
                error: "User not found"
            });
        }

        // Hash new password
        const hashedPassword = await bcrypt.hash(newPassword, Number(process.env.HASH_PASS));

        user.password = hashedPassword;

        await user.save();

        // OPTIONAL BUT RECOMMENDED:
        // LOGOUT ALL EXISTING SESSIONS

        await Secession.deleteMany({
            userId: user._id
        });

        sendPasswordChangedEmail(user.email).catch(error => {

            console.error("❌ Password Changed Email Error:", error.message);

        });

        return res.status(200).json({
            success: true,
            message: "Password reset successful. Please login again."
        });

    } catch (error) {

        console.error("❌ Reset Password Error:", error.message);

        return res.status(500).json({
            success: false,
            error: "Error during reset password"
        });
    }
});


// LOGOUT

authRouter.post('/logout', async (req, res) => {
    try {
        const refreshToken = req.cookies?.refreshToken;


        // Delete all sessions of this user
        if (refreshToken) {
            await Secession.deleteOne({ refreshToken });
        }
        // Clear access token
        res.clearCookie("accessToken", getCookieOptions());

        // Clear refresh token
        res.clearCookie("refreshToken", getCookieOptions());

        return res.status(200).json({
            success: true,
            message: "Logged out successfully"
        });

    } catch (error) {
        console.error("❌ Logout Error:", error.message);

        return res.status(500).json({
            success: false,
            error: "Error during logout"
        });
    }
});



module.exports = {
    authRouter
};
