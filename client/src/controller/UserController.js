const UserService = require('../models/UserService');

class UserController {
    async showUserCard(req, res) {
        const data = await UserService.getProductInCard();
        res.render('cart', { products: data.data });
    }

    async showUserOrder(req, res) {
        //const data = await UserService.getProductInOrder();
        res.render('order', );
    }
}

module.exports = new UserController();