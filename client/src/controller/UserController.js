const UserService = require('../models/UserService');

class UserController {
    async showUserCard(req, res) {
        const data = await UserService.getProductInCard();
        res.render('cart', { products: data.data });
    }
}

module.exports = new UserController();