const Product = require('../schemas/Product');
const Discount = require('../schemas/Discount');
const fs = require('fs');

// Function to convert image to Base64
function imageToBase64(filePath) {
    const imageBuffer = fs.readFileSync(filePath);
    return imageBuffer.toString('base64');
}

async function seed() {
    try {
        // Clear existing data
        await Product.deleteMany();
        await Discount.deleteMany();

        // Create some products
        const product1 = new Product({
            name: 'Porsche 911 Carrera',
            price: 9630000000,
            description: 'A luxury sports car that delivers unmatched performance and style.',
            brand: 'Porsche',
            model: '911 Carrera',
            year: 2024,
            power: '480 PS (353 kW)',
            torque: '570 Nm',
            acceleration: 3.2,
            maxSpeed: 311.0,
            combinedConsumption: null,
            CO2Emissions: null,
            image: imageToBase64('./src/public/images/fc1.png'), // Use base64 image data
            createdAt: new Date('2024-01-01T00:00:00.000Z'),
            updatedAt: new Date('2024-01-01T00:00:00.000Z'),
        });

        const product2 = new Product({
            name: 'Ferrari F8 Tributo',
            price: 12800000000,
            description: 'An Italian high-performance sports car known for its speed and agility.',
            brand: 'Ferrari',
            model: 'F8 Tributo',
            year: 2024,
            power: '720 PS (530 kW)',
            torque: '770 Nm',
            acceleration: 2.9,
            maxSpeed: 340.0,
            combinedConsumption: 11.5,
            CO2Emissions: 280.0,
            image: imageToBase64('./src/public/images/fc2.png'), // Use base64 image data
            createdAt: new Date('2024-01-01T00:00:00.000Z'),
            updatedAt: new Date('2024-01-01T00:00:00.000Z'),
        });

        const product3 = new Product({
            name: 'BMW M5 Competition',
            price: 12000000000,
            description: 'A powerful sedan with extraordinary performance and luxury features.',
            brand: 'BMW',
            model: 'M5 Competition',
            year: 2024,
            power: '625 PS (460 kW)',
            torque: '750 Nm',
            acceleration: 3.1,
            maxSpeed: 305.0,
            combinedConsumption: 10.0,
            CO2Emissions: 245.0,
            image: imageToBase64('./src/public/images/fc3.png'), // Use base64 image data
            createdAt: new Date('2024-01-01T00:00:00.000Z'),
            updatedAt: new Date('2024-01-01T00:00:00.000Z'),
        });

        const product4 = new Product({
            name: 'Lamborghini Huracán EVO',
            price: 20500000000,
            description: 'A stunning supercar that combines luxury and extreme performance.',
            brand: 'Lamborghini',
            model: 'Huracán EVO',
            year: 2024,
            power: '640 PS (471 kW)',
            torque: '600 Nm',
            acceleration: 2.9,
            maxSpeed: 325.0,
            combinedConsumption: 13.0,
            CO2Emissions: 300.0,
            image: imageToBase64('./src/public/images/fc4.png'), // Use base64 image data
            createdAt: new Date('2024-01-01T00:00:00.000Z'),
            updatedAt: new Date('2024-01-01T00:00:00.000Z'),
        });

        const product5 = new Product({
            name: 'Audi R8 V10 Performance',
            price: 15000000000,
            description: 'A V10 powered sports car with a sleek design and breathtaking performance.',
            brand: 'Audi',
            model: 'R8 V10 Performance',
            year: 2024,
            power: '610 PS (449 kW)',
            torque: '560 Nm',
            acceleration: 3.1,
            maxSpeed: 330.0,
            combinedConsumption: 12.0,
            CO2Emissions: 270.0,
            image: imageToBase64('./src/public/images/fc5.png'), // Use base64 image data
            createdAt: new Date('2024-01-01T00:00:00.000Z'),
            updatedAt: new Date('2024-01-01T00:00:00.000Z'),
        });

        const product6 = new Product({
            name: 'Chevrolet Corvette Z06',
            price: 10500000000,
            description: 'An iconic American muscle car with world-class performance and design.',
            brand: 'Chevrolet',
            model: 'Corvette Z06',
            year: 2024,
            power: '670 PS (493 kW)',
            torque: '630 Nm',
            acceleration: 2.6,
            maxSpeed: 335.0,
            combinedConsumption: 14.0,
            CO2Emissions: 320.0,
            image: imageToBase64('./src/public/images/fc6.png'), // Use base64 image data
            createdAt: new Date('2024-01-01T00:00:00.000Z'),
            updatedAt: new Date('2024-01-01T00:00:00.000Z'),
        });

        // Save products
        await product1.save();
        await product2.save();
        await product3.save();
        await product4.save();
        await product5.save();
        await product6.save();

        // Create a discount
        const discount = new Discount({
            name: 'Summer Sale',
            discount: 15, // 15% off
            startDate: new Date('2024-06-01'),
            endDate: new Date('2024-08-31'),
            products: [product1, product2], // Associate products with this discount
        });

        await discount.save();

        console.log('Seed data has been added to the database.');
    } catch (err) {
        console.error('Error seeding data:', err);
    }
}

module.exports = seed;
