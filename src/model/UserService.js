const { PrismaClient } = require('@prisma/client');

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
                return { msg: "User already exists" };
            }

            await this.prisma.user.create({
                data: {
                    name: user.username,
                    email: user.email,
                    password: user.password
                }
            });
            return { msg: "User added successfully" };
        } catch (error) {
            if (error.code === 'P2002') {
                console.error("Unique constraint failed: Email already exists.");
            } else {
                console.error("Error adding user:", error.message);
            }
            return { msg: "Error adding user" };
        }

    }

    async getUsers() {
        return await this.prisma.user.findMany();
    }
}

module.exports = UserService;