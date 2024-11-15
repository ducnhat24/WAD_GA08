const jwt = require('jsonwebtoken');
const path = require('path');
const dotenv = require('dotenv');
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const generateAccessToken = (payload) => {
    try {
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' });
        return token;
    }
    catch (err) {

        console.log(err);
    }
}

const verifyToken = (req, res, next) => {
    // const authHeader = req.headers['authorization']
    // const token = authHeader && authHeader.split(' ')[1]
    const token = req.cookies.token;

    if (token == null) {
        req.isAuthenticated = false;
        return next();
    }


    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
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
    verifyToken,
}