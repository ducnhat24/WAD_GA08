

const CartService = require('../model/CartService.js');
const cartService = new CartService();
const User = require("../schemas/User"); // Import model User
// const { multipleMongooseToObject, mongooseToObject } = require('../utils/mongoose');
class CartController {
    async addProductToCart(req, res) {
        try {
            const { userId, productId, quantity } = req.body;
            const result = await cartService.addProductToCart({ userId, productId, quantity });
            if (result.status === 'success') {
                return res.status(200).json({ cart: result.cart });
            }
            console.log(result.message);
            return res.status(500).json({ message: "Error adding to cart" });
        }
        catch {
            console.log("Error adding to cart");
        }
    }

    async removeProductFromCart(req, res) {
        const { userId, productId } = req.body;
        try {
            const result = await cartService.removeProductFromCart({ userId, productId });
            if (result.status === 'success') {
                return res.status(200).json({ message: "Product removed from cart" });
            }
            console.log(result.message);
            return res.status(500).json({ message: "Error removing from cart" });
        }
        catch (err) {
            console.log(err.message);
        }
    }

    async updateProductInCart(req, res) {
        const { userId, productId, quantity } = req.body;
        try {
            const result = await cartService.updateProductInCart({ userId, productId, quantity });
            if (result.status === 'success') {
                return res.status(200).json({ status: 'success', message: "Product updated in cart" });
            }
            console.log(result.message);
            return res.status(500).json({ message: "Error updating in cart" });
        }
        catch (err) {
            console.log(err.message);
        }

    }

    async getCart(req, res) {
        const { userId } = req.params;

        try {
            const result = await cartService.getCart(userId);
            if (result.status === 'success') {
                return res.status(200).json({ cart: result.cart });
            }
            console.log(result.message);
            return res.status(500).json({ message: "Error getting cart" });
        }
        catch (err) {
            console.log(err.message);
        }
    }
}

module.exports = new CartController;