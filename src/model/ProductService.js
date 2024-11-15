const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class ProductService {
    constructor() {
        this.prisma = new PrismaClient();
    }

    async getAllProducts() {
        try {
            const products = await prisma.product.findMany({
                select: {
                    id: true,
                    name: true,
                    price: true,
                    description: true,
                    image: true,
                }
            });
            return products || [];
        } catch (error) {
            console.error(error);
            res.status(500).send("An error occurred while fetching products");
        }
    }

    getProducts() {
        return this.products;
    }

    async getAllProducts() {
        try {
            const products = await this.prisma.product.findMany({
                select: {
                    id: true,
                    name: true,
                    price: true,
                    description: true,
                    image: true,
                }
            });
            return products || [];
        } catch (error) {
            console.error(error);
            throw new Error("An error occurred while fetching products");
        }
    }

    async getProductById(id) {
        try {
            const product = await this.prisma.product.findUnique({
                where: { id: id },
                select: {
                    id: true,
                    name: true,
                    price: true,
                    description: true,
                    power: true,
                    torque: true,
                    acceleration: true,
                    maxSpeed: true,
                    combinedConsumption: true,
                    CO2Emissions: true,
                    image: true,
                }
            });
            return product || null;
        } catch (error) {
            console.error(error);
            throw new Error("An error occurred while fetching the product");
        }
    }
}

module.exports = ProductService;