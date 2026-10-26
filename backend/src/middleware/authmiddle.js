
const jwt = require("jsonwebtoken");
const { User } = require("../models/user");
const { Secession } = require("../models/Secession");
const {
    generateAccessToken,
    generateRefreshToken
} = require("../utils/token");

const isProduction = process.env.NODE_ENV === "production";
const REFRESH_TOKEN_MAX_AGE = 7 * 24 * 60 * 60 * 1000;

const getCookieOptions = (maxAge) => ({
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? "none" : "lax",
    path: "/",
    maxAge
});

const userAuth = async (req, res, next) => {
    try {
        const token = req.cookies?.accessToken

        let user = null;

        // Verify access token
        if (token) {
            try {
                const { id } = jwt.verify(
                    token,
                    process.env.ACCESS_TOKEN_SECRET
                );

                if (id) {
                    user = await User.findById(id).select("-password");
                }
            } catch (error) {
                if (error.name !== "TokenExpiredError" &&
                    error.name !== "JsonWebTokenError" &&
                    error.name !== "NotBeforeError") {
                    throw error;
                }
            }
        }

        // Refresh access token if necessary
        if (!user) {
            const refreshToken = req.cookies?.refreshToken;

            if (refreshToken) {
                try {
                    const decoded = jwt.verify(
                        refreshToken,
                        process.env.REFRESH_TOKEN_SECRET
                    );

                    if (decoded.type !== "refresh" || !decoded.id) {
                        throw new Error("Invalid refresh token");
                    }

                    const session = await Secession.findOne({
                        userId: decoded.id,
                        refreshToken,
                        expiresAt: { $gt: new Date() }
                    });

                    if (session) {
                        user = await User.findById(decoded.id).select("-password");

                        if (user) {
                            const newAccessToken = generateAccessToken(user);
                            const newRefreshToken = generateRefreshToken(user);

                            session.refreshToken = newRefreshToken;
                            session.expiresAt = new Date(
                                Date.now() + REFRESH_TOKEN_MAX_AGE
                            );

                            await session.save();

                            res.cookie("accessToken", newAccessToken, getCookieOptions(15 * 60 * 1000));

                            res.cookie("refreshToken", newRefreshToken, getCookieOptions(REFRESH_TOKEN_MAX_AGE));
                        }
                    }
                } catch (error) {
                    if (
                        error.name !== "TokenExpiredError" &&
                        error.name !== "JsonWebTokenError" &&
                        error.name !== "NotBeforeError" &&
                        error.message !== "Invalid refresh token"
                    ) {
                        throw error;
                    }
                }
            }
        }

        if (!user) {
            return res.status(401).json({
                success: false,
                error: "Login first"
            });
        }

        req.user = user;
        return next();
    } catch (error) {
        console.error("Authentication error:", error);

        return res.status(500).json({
            success: false,
            error: "Authentication failed"
        });
    }
};

module.exports = { userAuth };
