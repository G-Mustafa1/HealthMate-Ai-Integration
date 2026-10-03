const jwt = require('jsonwebtoken');
const { User } = require('../models/user');

const userAuth = async (req, res, next) => {
    try {
        const token = req.cookies?.accessToken || req.headers.authorization?.split(" ")[1];

        if (!token) {
            return res.status(401).json({
                success: false,
                error: "Login first"
            });
        }

        let decoded;

        try {
            decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        } catch (error) {

            if (error.name === "TokenExpiredError") {
                return res.status(401).json({
                    success: false,
                    error: "Access token expired",
                    isExpired: true
                });
            }

            return res.status(401).json({
                success: false,
                error: "Invalid access token"
            });
        }

        const { id } = decoded;

        const user = await User.findById(id).select("-password");

        if (!user) {
            return res.status(404).json({
                success: false,
                error: "User not found"
            });
        }

        req.user = user;

        next();

    } catch (error) {

        console.error("❌ Authentication error:", error);

        return res.status(500).json({
            success: false,
            error: "Authentication failed"
        });
    }
};

module.exports = {
    userAuth
};
