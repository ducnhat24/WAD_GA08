const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class ProductService {

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

    async getProductById(id) {
        try {
            const product = await prisma.product.findUnique({
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

    async searchProduct(query) {
        try {
            const products = await prisma.product.findMany({
                where: {
                    OR: [
                        { name: { contains: query } },
                        { description: { contains: query } }
                    ]
                },
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
            throw new Error("An error occurred while searching for products");
        }
    }

    async getSameProduct(product) {
        try {
            const sameProducts = await prisma.product.findMany({
                where: {
                    id: { not: product.id },
                    name: product.name
                },
                select: {
                    id: true,
                    name: true,
                    price: true,
                    description: true,
                    image: true,
                }
            });
            return sameProducts || [];
        } catch (error) {
            console.error(error);
            throw new Error("An error occurred while fetching same products");
        }
    }
}

module.exports = ProductService;