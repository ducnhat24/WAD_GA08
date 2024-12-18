class HomeController {
    showHome(req, res) {
        res.render('home');
    }
}

module.exports = new HomeController;