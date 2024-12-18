class LoginController {
    showLogin(req, res) {
        res.render('login');
    }
}

module.exports = new LoginController;