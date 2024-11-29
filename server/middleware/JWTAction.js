const jwt = require('jsonwebtoken');
const path = require('path');
const dotenv = require('dotenv');
const User = require('../schemas/User');
dotenv.config();

function generateAccessToken(payload) {
    try {
        const token = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, { expiresIn: '1h' });
        return token;
    }
    catch (err) {
        console.log(err);
    }
}

function generateRefreshToken(payload) {
    console.log(payload);
    try {
        console.log("access tokennnnn");

        const token = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, { expiresIn: '5h' });
        return token;
    }
    catch (err) {
        console.log(err);
    }
}

function renewAccessToken(req, res) {
    const refreshToken = res.body.refreshToken;

    try {
        if (refreshToken == null) {
            return res.json({ valid: false, msg: "No refresh token" });
        }

        jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET, (err, user) => {
            if (err) {
                return res.json({ valid: false, msg: "Invalid refresh token" });
            }

            const userData = User.findOne({ _id: user.id });
            if (!userData || userData.refreshToken !== refreshToken) {
                return res.status(403).json({ status: 'error', message: 'Refresh token is invalid' });
            }
            const accessToken = generateAccessToken({ id: userData._id });
            res.cookie = ('token', accessToken, { httpOnly: true });

            return res.json({
                status: 'success',
                message: 'Access token renewed',
            });
        });
    }
    catch (err) {
        console.log(err);
    }
}

function verifyToken(req, res, next) {
    console.log("verify token");
    try {

        const token = req.cookies.accessToken;
        console.log(token);
        if (token == null) {
            return renewAccessToken(req, res);
        }


        jwt.verify(token, process.env.JWT_ACCESS_SECRET, (err, user) => {
            if (err) {
                req.isAuthenticated = false;
                return next();
            }

            req.user = user;
            req.isAuthenticated = true;
            next()
        })
    }
    catch (err) {
        if (err.name === 'TokenExpiredError') {
            return renewAccessToken(req, res);
        }
    }
}


module.exports = {
    generateAccessToken,
    generateRefreshToken,
    verifyToken,
}