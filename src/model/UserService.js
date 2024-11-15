const { generateAccessToken } = require('../middleware/JWTAction');
const User = require('../schemas/User');

class UserService {

    async addUser(user) {
        // try {
        //     const existingUser = await this.prisma.user.findUnique({
        //         where: { email: user.email },
        //     });

        //     if (existingUser) {
        //         return {
        //             status: "error",
        //             msg: "User already exists"
        //         };
        //     }

        //     await this.prisma.user.create({
        //         data: {
        //             name: user.username,
        //             email: user.email,
        //             password: user.password
        //         }
        //     });
        //     return {
        //         status: "success",
        //         msg: "User added successfully"
        //     };
        // } catch (error) {
        //     if (error.code === 'P2002') {

        //         return {
        //             status: "error",
        //             msg: "User already exists"
        //         }
        //     }
        //     return {
        //         status: "error",
        //         msg: "Error adding user"
        //     };
        // }
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
        //     const existingUser = await this.prisma.user.findFirst({
        //         where: {
        //             OR: [
        //                 { email: user.useraccount },
        //                 { name: user.useraccount }
        //             ],
        //             password: user.password
        //         }
        //     });

        //     if (!existingUser) {
        //         return {
        //             status: "error",
        //             msg: "Invalid credentials"
        //         };
        //     }

        //     const payload = {
        //         id: existingUser.id,
        //         name: existingUser.name
        //     };

        //     return {
        //         status: "success",
        //         token: generateAccessToken(payload),
        //         msg: "Login successful"
        //     };
        // }

        try {
            const { useraccount, password } = user;
            const existingUser = await User.findOne({ $or: [{ email: useraccount }, { name: useraccount }], password: password });
            if (!existingUser) {
                return {
                    status: "error",
                    msg: "Invalid credentials"
                };
            }
            const payload = {
                id: existingUser._id,
                name: existingUser.name
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
}

module.exports = UserService;