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

        // Create products
        const products = [
            {
                name: 'Toyota Land Cruiser',
                price: 8500000000,
                description: 'A robust SUV designed for extreme off-road performance and luxury.',
                brand: 'Toyota',
                model: 'SUV',
                year: 2024,
                power: '305 PS (224 kW)',
                torque: '650 Nm',
                acceleration: 6.7,
                maxSpeed: 210.0,
                combinedConsumption: 13.0,
                CO2Emissions: 275.0,
                image: imageToBase64('./src/public/images/fc1.png'),
            },
            {
                name: 'Honda Accord',
                price: 3200000000,
                description: 'A reliable sedan offering great fuel economy and advanced features.',
                brand: 'Honda',
                model: 'Sedan',
                year: 2024,
                power: '192 PS (141 kW)',
                torque: '260 Nm',
                acceleration: 7.3,
                maxSpeed: 200.0,
                combinedConsumption: 6.8,
                CO2Emissions: 160.0,
                image: imageToBase64('./src/public/images/fc2.png'),
            },
            {
                name: 'Ford Explorer',
                price: 5500000000,
                description: 'A spacious SUV designed for families and adventure seekers.',
                brand: 'Ford',
                model: 'SUV',
                year: 2024,
                power: '400 PS (294 kW)',
                torque: '560 Nm',
                acceleration: 5.9,
                maxSpeed: 225.0,
                combinedConsumption: 12.5,
                CO2Emissions: 290.0,
                image: imageToBase64('./src/public/images/fc3.png'),
            },
            {
                name: 'Mercedes-Benz E-Class',
                price: 7500000000,
                description: 'A luxury sedan combining elegance, comfort, and performance.',
                brand: 'Mercedes-Benz',
                model: 'Sedan',
                year: 2024,
                power: '330 PS (243 kW)',
                torque: '500 Nm',
                acceleration: 5.5,
                maxSpeed: 250.0,
                combinedConsumption: 8.5,
                CO2Emissions: 195.0,
                image: imageToBase64('./src/public/images/fc4.png'),
            },
            {
                name: 'Jeep Wrangler',
                price: 4100000000,
                description: 'An iconic SUV made for off-road enthusiasts and rugged terrains.',
                brand: 'Jeep',
                model: 'SUV',
                year: 2024,
                power: '285 PS (213 kW)',
                torque: '352 Nm',
                acceleration: 7.8,
                maxSpeed: 180.0,
                combinedConsumption: 14.0,
                CO2Emissions: 320.0,
                image: imageToBase64('./src/public/images/fc5.png'),
            },
            {
                name: 'Hyundai Tucson',
                price: 3100000000,
                description: 'A compact SUV with modern design and efficient performance.',
                brand: 'Hyundai',
                model: 'SUV',
                year: 2024,
                power: '187 PS (138 kW)',
                torque: '245 Nm',
                acceleration: 8.5,
                maxSpeed: 190.0,
                combinedConsumption: 7.5,
                CO2Emissions: 180.0,
                image: imageToBase64('./src/public/images/fc6.png'),
            },
            {
                name: 'Tesla Model S',
                price: 11000000000,
                description: 'An electric sedan delivering unmatched acceleration and range.',
                brand: 'Tesla',
                model: 'Sedan',
                year: 2024,
                power: '1,020 PS (750 kW)',
                torque: '1,020 Nm',
                acceleration: 2.1,
                maxSpeed: 322.0,
                combinedConsumption: null,
                CO2Emissions: 0.0,
                image: imageToBase64('./src/public/images/fc1.png'),
            },
            {
                name: 'Kia Sorento',
                price: 3800000000,
                description: 'A mid-size SUV with a focus on comfort, technology, and safety.',
                brand: 'Kia',
                model: 'SUV',
                year: 2024,
                power: '277 PS (206 kW)',
                torque: '421 Nm',
                acceleration: 6.9,
                maxSpeed: 210.0,
                combinedConsumption: 8.2,
                CO2Emissions: 190.0,
                image: imageToBase64('./src/public/images/fc2.png'),
            },
            {
                name: 'Volkswagen Passat',
                price: 3400000000,
                description: 'A practical sedan that balances performance and comfort.',
                brand: 'Volkswagen',
                model: 'Sedan',
                year: 2024,
                power: '280 PS (206 kW)',
                torque: '400 Nm',
                acceleration: 6.8,
                maxSpeed: 210.0,
                combinedConsumption: 7.2,
                CO2Emissions: 165.0,
                image: imageToBase64('./src/public/images/fc3.png'),
            },
            {
                name: 'Range Rover Sport',
                price: 12500000000,
                description: 'A luxury SUV that offers premium features and off-road capability.',
                brand: 'Land Rover',
                model: 'SUV',
                year: 2024,
                power: '525 PS (386 kW)',
                torque: '625 Nm',
                acceleration: 4.3,
                maxSpeed: 250.0,
                combinedConsumption: 12.0,
                CO2Emissions: 275.0,
                image: imageToBase64('./src/public/images/fc4.png'),
            },
        ];

        // Save all products
        await Product.insertMany(products);

        // Create a discount
        const discount = new Discount({
            name: 'End of Year Sale',
            discount: 10, // 10% off
            startDate: new Date('2024-12-01'),
            endDate: new Date('2024-12-31'),
            products: products.slice(0, 5), // Associate the first 5 products with this discount
        });

        await discount.save();

        console.log('Seed data has been added to the database.');
    } catch (err) {
        console.error('Error seeding data:', err);
    }
}

module.exports = seed;
