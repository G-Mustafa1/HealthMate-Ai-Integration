const jwt = require('jsonwebtoken');
const { User } = require('../models/user');
const { Secession } = require('../models/Secession');
const { generateAccessToken, generateRefreshToken } = require('../utils/token');

const isProduction = process.env.NODE_ENV === "production";

const getCookieOptions = (extraOptions = {}) => ({
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? "none" : "lax",
    path: "/",
    ...extraOptions
});

const userAuth = async (req, res, next) => {
    try {
        const token = req.cookies?.accessToken || req.headers.authorization?.split(" ")[1];
        let user = null;

        if (token) {
            try {
                const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
                if (decoded?.id) {
                    user = await User.findById(decoded.id).select("-password");
                }
            } catch (err) {
                // Access token expired or invalid — fallback to refresh token below
            }
        }

        // 2. If access token was missing or expired, attempt seamless refresh with refreshToken
        if (!user) {
            const refreshToken = req.cookies?.refreshToken;

            if (refreshToken) {
                try {
                    const decodedRefresh = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

                    if (decodedRefresh?.id && decodedRefresh.type === "refresh") {
                        const session = await Secession.findOne({
                            userId: decodedRefresh.id,
                            refreshToken: refreshToken
                        });

                        if (session && session.expiresAt > new Date()) {
                            const dbUser = await User.findById(decodedRefresh.id).select("-password");

                            if (dbUser) {
                                // Generate new 15m access token & rotate 7d refresh token
                                const newAccessToken = generateAccessToken(dbUser);
                                const newRefreshToken = generateRefreshToken(dbUser);

                                session.refreshToken = newRefreshToken;
                                session.expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
                                await session.save();

                                res.cookie("accessToken", newAccessToken, getCookieOptions({
                                    maxAge: 15 * 60 * 1000, // 15 mins
                                }));

                                res.cookie("refreshToken", newRefreshToken, getCookieOptions({
                                    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
                                }));

                                user = dbUser;
                            }
                        }
                    }
                } catch (refreshErr) {
                    // Refresh token is also expired or invalid
                }
            }
        }

        // 3. If neither token succeeded, user is unauthenticated
        if (!user) {
            return res.status(401).json({
                success: false,
                error: "Login first"
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
