const { PrismaClient } = require('@prisma/client');
const { generateAccessToken } = require('../middleware/JWTAction');

class UserService {
    constructor() {
        this.prisma = new PrismaClient();
    }

    async addUser(user) {
        try {
            const existingUser = await this.prisma.user.findUnique({
                where: { email: user.email },
            });

            if (existingUser) {
                return {
                    status: "error",
                    msg: "User already exists"
                };
            }

            await this.prisma.user.create({
                data: {
                    name: user.username,
                    email: user.email,
                    password: user.password
                }
            });
            return {
                status: "success",
                msg: "User added successfully"
            };
        } catch (error) {
            if (error.code === 'P2002') {

                return {
                    status: "error",
                    msg: "User already exists"
                }
            }
            return {
                status: "error",
                msg: "Error adding user"
            };
        }

    }

    async getUsers() {
        return await this.prisma.user.findMany();
    }

    async login(user) {
        const existingUser = await this.prisma.user.findFirst({
            where: {
                OR: [
                    { email: user.useraccount },
                    { name: user.useraccount }
                ],
                password: user.password
            }
        });

        if (!existingUser) {
            return {
                status: "error",
                msg: "Invalid credentials"
            };
        }

        const payload = {
            id: existingUser.id,
            name: existingUser.name
        };

        return {
            status: "success",
            token: generateAccessToken(payload),
            msg: "Login successful"
        };
    }
}

module.exports = UserService;