const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const fs = require('fs');

function imageToBase64(filePath) {
    const imageBuffer = fs.readFileSync(filePath);
    return imageBuffer.toString('base64');
}

async function main() {
    await prisma.Product.deleteMany();

    // Insert products
    await prisma.Product.createMany({
        data: [
            {
                id: "prod_1",
                name: "Porsche 911 Carrera",
                price: BigInt(9630000000),
                description: "A luxury sports car that delivers unmatched performance and style.",
                power: "480 PS (353 kW)",
                torque: "570 Nm",
                acceleration: 3.2,
                maxSpeed: 311.0,
                combinedConsumption: null,
                CO2Emissions: null,
                image: imageToBase64("./src/public/images/fc1.png"),
                createdAt: new Date("2024-01-01T00:00:00.000Z"),
                updatedAt: new Date("2024-01-01T00:00:00.000Z"),
            },
            {
                id: "prod_2",
                name: "Ferrari F8 Tributo",
                price: BigInt(12800000000),
                description: "An Italian high-performance sports car known for its speed and agility.",
                power: "720 PS (530 kW)",
                torque: "770 Nm",
                acceleration: 2.9,
                maxSpeed: 340.0,
                combinedConsumption: 11.5,
                CO2Emissions: 280.0,
                image: imageToBase64("./src/public/images/fc2.png"),
                createdAt: new Date("2024-01-01T00:00:00.000Z"),
                updatedAt: new Date("2024-01-01T00:00:00.000Z"),
            },
            {
                id: "prod_3",
                name: "BMW M5 Competition",
                price: BigInt(12000000000),
                description: "A powerful sedan with extraordinary performance and luxury features.",
                power: "625 PS (460 kW)",
                torque: "750 Nm",
                acceleration: 3.1,
                maxSpeed: 305.0,
                combinedConsumption: 10.0,
                CO2Emissions: 245.0,
                image: imageToBase64("./src/public/images/fc3.png"),
                createdAt: new Date("2024-01-01T00:00:00.000Z"),
                updatedAt: new Date("2024-01-01T00:00:00.000Z"),
            },
            {
                id: "prod_4",
                name: "Lamborghini Huracán EVO",
                price: BigInt(20500000000),
                description: "A stunning supercar that combines luxury and extreme performance.",
                power: "640 PS (471 kW)",
                torque: "600 Nm",
                acceleration: 2.9,
                maxSpeed: 325.0,
                combinedConsumption: 13.0,
                CO2Emissions: 300.0,
                image: imageToBase64("./src/public/images/fc4.png"),
                createdAt: new Date("2024-01-01T00:00:00.000Z"),
                updatedAt: new Date("2024-01-01T00:00:00.000Z"),
            },
            {
                id: "prod_5",
                name: "Audi R8 V10 Performance",
                price: BigInt(15000000000),
                description: "A V10 powered sports car with a sleek design and breathtaking performance.",
                power: "610 PS (449 kW)",
                torque: "560 Nm",
                acceleration: 3.1,
                maxSpeed: 330.0,
                combinedConsumption: 12.0,
                CO2Emissions: 270.0,
                image: imageToBase64("./src/public/images/fc5.png"),
                createdAt: new Date("2024-01-01T00:00:00.000Z"),
                updatedAt: new Date("2024-01-01T00:00:00.000Z"),
            },
            {
                id: "prod_6",
                name: "Chevrolet Corvette Z06",
                price: BigInt(10500000000),
                description: "An iconic American muscle car with world-class performance and design.",
                power: "670 PS (493 kW)",
                torque: "630 Nm",
                acceleration: 2.6,
                maxSpeed: 335.0,
                combinedConsumption: 14.0,
                CO2Emissions: 320.0,
                image: imageToBase64("./src/public/images/fc6.png"),
                createdAt: new Date("2024-01-01T00:00:00.000Z"),
                updatedAt: new Date("2024-01-01T00:00:00.000Z"),
            },
        ],
    });
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
