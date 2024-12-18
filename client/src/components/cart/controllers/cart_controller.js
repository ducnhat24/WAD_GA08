const CartService = require('../models/cart_service');

class CartController {
    async showUserCard(req, res) {
        res.render('cart');
    }
}

module.exports = new CartController();