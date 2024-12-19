const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../schemas/User');
const jwt = require('jsonwebtoken');
const { generateAccessToken, generateRefreshToken } = require('./JWTAction');
const UserService = require('../components/user/model/UserService'); // Import UserService
const userService = new UserService();

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: `${process.env.BASE_URL}/auth/google/callback`,
}, async (accessToken, refreshToken, profile, done) => {
    try {
        console.log('Google Profile:', profile);
        console.log('Google Profile ID:', profile.id);
        console.log('Google Profile Email:', profile.emails[0].value);
        console.log('Before find user');
        let user = await User.findOne({ email: profile.emails[0].value });
        console.log('After find user');
        console.log('User:', user);
        if (!user) {
            console.log('Creating new user...');
            user = await User.create({
                googleId: profile.id,
                email: profile.emails[0].value,
                name: profile.displayName,
                password: null, // Không có password cho OAuth
            });
        }
        console.log('The code before cannot reach'); 
        done(null, user);
    } catch (err) {
        console.error('Error in GoogleStrategy:', err);
        done(err, null);
    }
}));


passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (err) {
        done(err, null);
    }
});

// Middleware bảo vệ JWT và xử lý callback Google
function authenticateGoogle(req, res, next) {
    passport.authenticate('google', { scope: ['profile', 'email'] })(req, res, next);
}

function handleGoogleCallback(req, res, next) {
    passport.authenticate('google', { session: false }, async (err, googleProfile) => {
        if (err || !googleProfile) {
            return res.status(401).json({ message: 'Google authentication failed' });
        }
        console.log('Google Profile:', googleProfile);
        // Sử dụng UserService để xử lý login bằng Google
        const result = await userService.loginWithGoogle(googleProfile);

        if (result.status === "error") {
            return res.status(500).json({ message: result.message });
        }

        // Gửi token về client
        res.cookie('accessToken', result.accessToken, { sameSite: 'none', secure: true });
        res.cookie('refreshToken', result.refreshToken, { sameSite: 'none', secure: true });
        res.redirect('https://wad-ga-08-client.vercel.app'); // Redirect về trang chính hoặc client-side xử lý token
    })(req, res, next);
}

module.exports = { authenticateGoogle, handleGoogleCallback };