const mongoose = require('mongoose');
const Product = require('./Product'); // Import the Product model

const discountSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    discount: {
        type: Number, // Discount value (percentage or amount)
        required: true,
    },
    startDate: {
        type: Date,
        required: true,
    },
    endDate: {
        type: Date,
        required: true,
    },
    // Use ObjectId to reference the Product model
    product: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product', // This is how you reference the Product model
        }
    ],
});

const Discount = mongoose.model('Discount', discountSchema);

module.exports = Discount;
