const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const fs = require('fs');

function imageToBase64(filePath) {
    const imageBuffer = fs.readFileSync(filePath);
    return imageBuffer.toString('base64');
}

async function main() {
    console.log("Clearing existing data...");
    // await prisma.product.deleteMany();
    // await prisma.discount.deleteMany(); 

    console.log("Seeding Discounts...");
    const discounts = [
        {
            id: "disc_1",
            name: "New Year Sale",
            discount: 10.0, // 10% discount
            startDate: new Date("2024-01-01T00:00:00.000Z"),
            endDate: new Date("2024-01-31T23:59:59.000Z"),
        },
        {
            id: "disc_2",
            name: "Valentine's Special",
            discount: 15.0, // 15% discount
            startDate: new Date("2024-02-01T00:00:00.000Z"),
            endDate: new Date("2024-02-14T23:59:59.000Z"),
        },
        {
            id: "disc_3",
            name: "Summer Clearance",
            discount: 20.0, // 20% discount
            startDate: new Date("2024-06-01T00:00:00.000Z"),
            endDate: new Date("2024-06-30T23:59:59.000Z"),
        },
    ];

    await prisma.discount.createMany({ data: discounts });

    console.log("Seeding Products...");
    const products = [
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
            discountId: "disc_1",
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
            discountId: "disc_2",
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
            discountId: "disc_3",
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
            discountId: null,
        },
    ];

    await prisma.product.createMany({ data: products });

    console.log("Database seeded successfully!");
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
