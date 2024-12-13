const UserService = require('../models/UserService');

class UserController {
    async showUserCard(req, res) {
        res.render('cart');
    }

    async showUserOrder(req, res) {
        //const data = await UserService.getProductInOrder();
        res.render('order');
    }
}

module.exports = new UserController();