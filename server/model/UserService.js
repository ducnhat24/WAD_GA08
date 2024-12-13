
const { generateAccessToken, generateRefreshToken } = require('../middleware/JWTAction.js');

const User = require('../schemas/User');
const bcrypt = require('bcrypt');

async function hashPassword(password) {
    try {
        const saltRounds = 1; // Độ mạnh của thuật toán (tốn tài nguyên hơn khi tăng số này)
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        return hashedPassword;
    } catch (err) {
        console.error("Error hashing password:", err);
        throw err;
    }
}

class UserService {

    async addUser(user) {
        try {
            const { username, email, password } = user;
            const existingUser = await User.findOne({ $or: [{ email: email }, { name: username }] });
            if (existingUser) {
                return {
                    status: "error",
                    message: "User already exists"
                };
            }
            const passwordHash = await hashPassword(password);

            const newUser = new User({
                name: username,
                email: email,
                password: passwordHash,
            });
            await newUser.save();
            return {
                status: "success",
                message: "User added successfully"
            };
        }
        catch (error) {
            return {
                status: "error",
                message: "Error adding user"
            };
        }
    }

    async login({ useraccount, password }) {
        try {
            const existingUser = await User.findOne({ $or: [{ email: useraccount }, { name: useraccount }] });
            if (!existingUser) {
                return {
                    status: "error",
                    msg: "Invalid credentials"
                };
            }
            const checkPassword = await bcrypt.compare(password, existingUser.password);
            if (checkPassword === false) {
                return {
                    status: "error",
                    msg: "Wrong password",
                };
            }
            const payload = {
                id: existingUser._id,
            };
            const refreshToken = generateRefreshToken(payload);
            await User.updateOne({ _id: existingUser._id }, { refreshToken: refreshToken });
            return {
                status: "success",
                accessToken: generateAccessToken(payload),
                refreshToken: refreshToken,
                msg: "Login successful",
                user: existingUser,
            };
        }
        catch (error) {
            return {
                status: "error",
                msg: error.message
            };
        }
    }

    async logout(refreshToken) {
        try {
            const user = await User.findOne({ refreshToken: refreshToken });
            if (!user) {
                return {
                    status: "error",
                    message: "Invalid refresh token"
                };
            }

            user.refreshToken = "";
            await user.save();
        }
        catch (error) {
            return {
                status: "error",
                message: error.message
            };
        }
    }
}

module.exports = UserService;