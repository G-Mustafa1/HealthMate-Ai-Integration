const nodemailer = require("nodemailer");
const handlebars = require("handlebars");
const fs = require("fs");
const path = require("path");

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
    },
});

/**
 * Load and compile Handlebars email template
 */
const loadTemplate = (templateName, data = {}) => {
    const templatePath = path.join(
        __dirname,
        "../templates/emails",
        `${templateName}.hbs`
    );

    const templateSource = fs.readFileSync(templatePath, "utf-8");

    const template = handlebars.compile(templateSource);

    return template({
        ...data,
        year: new Date().getFullYear(),
    });
};

/**
 * Send email
 */
const sendEmail = async (to, subject, html) => {
    try {
        const info = await transporter.sendMail({
            from: `"HealthMate" <${process.env.MAIL_USER}>`,
            to,
            subject,
            html,
        });

        console.log("✅ Email sent:", to);

        return info;
    } catch (error) {
        console.error("❌ Email error:", error.message);
        throw error;
    }
};

/**
 * Signup email verification OTP
 */
const sendSignupOTP = async (email, otp) => {
    const html = loadTemplate("signup-otp", {
        otp,
        expiresIn: 10,
    });

    return sendEmail(
        email,
        "Verify your HealthMate email",
        html
    );
};

/**
 * New login notification
 */
const sendLoginNotification = async (email) => {
    const html = loadTemplate("login-notification");

    return sendEmail(
        email,
        "New login to your HealthMate account",
        html
    );
};

/**
 * Forgot password OTP
 */
const sendForgotPasswordOTP = async (email, otp) => {
    const html = loadTemplate("forgot-password-otp", {
        otp,
        expiresIn: 10,
    });

    return sendEmail(
        email,
        "Reset your HealthMate password",
        html
    );
};

/**
 * Password changed notification
 */
const sendPasswordChangedEmail = async (email) => {
    const html = loadTemplate("password-changed");

    return sendEmail(
        email,
        "Your HealthMate password was changed",
        html
    );
};

module.exports = {
    sendSignupOTP,
    sendLoginNotification,
    sendForgotPasswordOTP,
    sendPasswordChangedEmail,
};
