
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
                    message: "Invalid credentials"
                };
            }
            const checkPassword = await bcrypt.compare(password, existingUser.password);
            if (checkPassword === false) {
                return {
                    status: "error",
                    message: "Wrong password",
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
                msg: "Login successful"
            };
        }
        catch (error) {
            return {
                status: "error",
                msg: error.message
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