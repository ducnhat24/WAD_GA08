const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number, // Using Number instead of BigInt for compatibility
        required: true,
    },
    description: {
        type: String,
        required: false,
    },
    brand: {
        type: String,
        required: true,
    },
    model: {
        type: String,
        required: true,
    },
    year: {
        type: Number,
        required: true,
    },
    power: {
        type: String,
        required: true,
    },
    torque: {
        type: String,
        required: true,
    },
    acceleration: {
        type: Number,
        required: true,
    },
    maxSpeed: {
        type: Number,
        required: true,
    },
    combinedConsumption: {
        type: Number,
        required: false,
    },
    CO2Emissions: {
        type: Number,
        required: false,
    },
    image: {
        type: String,
        required: true,
    },
    updateDate: {
        type: Date,
        default: Date.now,
    },

    createDate: {
        type: Date,
        default: Date.now,
    }
}, {
    timestamps: true, // Automatically handles createdAt and updatedAt
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
