const jwt = require('jsonwebtoken');
const path = require('path');
const dotenv = require('dotenv');
const UserService = require('../model/UserService.js');
dotenv.config();

function generateAccessToken(payload) {
    try {
        const token = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, { expiresIn: '1m' });
        return token;
    }
    catch (err) {

        console.log(err);
    }
}

function generateRefreshToken(payload) {
    try {
        const token = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, { expiresIn: '5m' });
        return token;
    }
    catch (err) {

        console.log(err);
    }
}

function renewToken(req, res) {
    const refreshToken = userService.getRefreshToken(req.body);
    let exists = false;

    if (refreshToken.status === "error") {
        return res.sendStatus(403);
    }

    const token = refreshToken.token;
    if (token == null) {
        return res.json({ valid: false, msg: "No refresh token" });
    }

    jwt.verify(token, process.env.JWT_REFRESH_SECRET, (err, user) => {
        if (err) {
            return res.json({ valid: false, msg: "Invalid refresh token" });
        }

        const accessToken = generateAccessToken({ id: user.id });
        res.cookie = ('token', accessToken, { httpOnly: true });
        exists = true;
    })

    return exists;
}

function verifyToken(req, res, next) {
    const token = req.cookies.accessToken;

    if (token == null) {
        if (renewToken(req, res)) {
            req.isAuthenticated = true
            return next();
        }
        req.isAuthenticated = false;
        return next();
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


module.exports = {
    generateAccessToken,
    generateRefreshToken,
    renewToken,
    verifyToken,
}