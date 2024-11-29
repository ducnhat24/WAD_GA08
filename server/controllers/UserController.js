const UserService = require('../model/UserService');
const userService = new UserService();

class UserController {

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
        console.log(user)
        res.cookie('accessToken', user.accessToken);
        res.cookie('refreshToken', user.refreshToken);
        res.json(user);
    }

    async logout(req, res) {
        res.clearCookie('token');
        return res.json({
            status: 'success',
            msg: 'Logged out'
        });
    }

    async auth(req, res) {
        return res.json({
            status: 'success',
            msg: 'Authenticated'
        });

    }
}

module.exports = new UserController;