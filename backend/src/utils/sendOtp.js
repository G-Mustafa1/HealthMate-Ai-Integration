const fs = require("fs");
const path = require("path");
const handlebars = require("handlebars");
const { sendEmail } = require("./sendEmail");


const loadTemplate = (templateName, data = {}) => {
    const templatePath = path.join(__dirname, "../templates/emails", `${templateName}.hbs`);

    const templateSource = fs.readFileSync(templatePath, "utf-8");

    const template = handlebars.compile(templateSource);

    return template({
        ...data,
        year: new Date().getFullYear(),
    });
};


const sendSignupOTP = async (email, otp) => {
    try {
        const html = loadTemplate("signup-otp", {
            otp,
            expiresIn: 10,
        });

        return sendEmail({
            email,
            subject: "Verify your HealthMate email",
            html
        });
    } catch (error) {
        console.error("❌ Email error:", error);
        throw error;
    }
};

const sendLoginNotification = async (email) => {
    try {
        const html = loadTemplate("login-notification");

        return sendEmail({
            email,
            subject: "New login to your HealthMate account",
            html
        });
    } catch (error) {
        console.error("❌ Email error:", error);
        throw error;
    }
};


const sendResetPasswordOTP = async (email, otp) => {
    try {
        const html = loadTemplate("reset-password-otp", {
            otp,
            expiresIn: 10,
        });

        return sendEmail({
            email,
            subject: "Reset your HealthMate password",
            html
        });
    } catch (error) {
        console.error("❌ Email error:", error);
        throw error;
    }
};

const sendPasswordChangedNotification = async (email) => {
    try {
        const html = loadTemplate("password-changed-notification");

        return sendEmail({
            email,
            subject: "Your HealthMate password has been changed",
            html
        });
    } catch (error) {
        console.error("❌ Email error:", error);
        throw error;
    }
};


module.exports = {
    sendSignupOTP,
};