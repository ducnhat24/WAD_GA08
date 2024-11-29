const { generateAccessToken } = require('../middleware/JWTAction');
const User = require('../schemas/User');

class UserService {

    async addUser(user) {
        try {
            const { username, email, password } = user;
            const existingUser = await User.findOne({ $or: [{ email: email }, { name: username }] });
            if (existingUser) {
                return {
                    status: "error",
                    msg: "User already exists"
                };
            }
            const newUser = new User({
                name: username,
                email: email,
                password: password
            });
            await newUser.save();
            return {
                status: "success",
                msg: "User added successfully"
            };
        }
        catch (error) {
            return {
                status: "error",
                msg: "Error adding user"
            };
        }
    }

    async login(user) {
        try {
            const { useraccount, password } = user;
            const existingUser = await User.findOne({ $or: [{ email: useraccount }, { name: useraccount }], password: password });
            if (!existingUser) {
                return {
                    status: "error",
                    msg: "Invalid credentials"
                };
            }
            existingUser.refreshToken = generateRefreshToken({ id: existingUser._id });
            const payload = {
                id: existingUser._id,
            };
            return {
                status: "success",
                token: generateAccessToken(payload),
                msg: "Login successful"
            };
        }
        catch (error) {
            return {
                status: "error",
                msg: "Invalid credentials"
            };
        }
    }

    async getRefreshToken(user) {
        const existingUser = await User.findOne({ $or: [{ email: user.email }, { name: user.name }] });
        if (!existingUser) {
            return {
                status: "error",
                msg: "User not found"
            };
        }
        return {
            status: "success",
            token: existingUser.refreshToken,
            msg: "Refresh token generated"
        };
    }
}

module.exports = UserService;