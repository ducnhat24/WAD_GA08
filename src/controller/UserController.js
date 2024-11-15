const UserService = require('../model/UserService');
const userService = new UserService();

class UserController {

    showSignup(req, res) {
        res.render('signup');
    }

    showLogin(req, res) {
        res.render('login');
    }

    async addUser(req, res) {
        const { username, email, password } = req.body;
        const status = await userService.addUser({ username, email, password });
        res.json(status);
    }

    async getUsers(req, res) {
        const users = await userService.getUsers();
        res.json(users);
    }

    async login(req, res) {
        const { useraccount, password } = req.body;
        const user = await userService.login({ useraccount, password });
        res.cookie('token', user.token, { httpOnly: true });
        res.json(user);
    }

    async logout(req, res) {
        res.clearCookie('token');
        return res.json({
            status: 'success',
            msg: 'Logged out'
        });
    }
}

module.exports = new UserController;