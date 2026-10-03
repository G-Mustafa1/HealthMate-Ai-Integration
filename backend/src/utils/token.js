require('dotenv').config();
const jwt = require('jsonwebtoken');

const generateAccessToken = (user) => {
    return jwt.sign({ id: user._id}, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
};

const generateRefreshToken = (user) => {
    return jwt.sign({ id: user._id, type: "refresh" }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '1d' });
}


module.exports = {
    generateAccessToken,
    generateRefreshToken,
};