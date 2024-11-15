class SiteController {
    showHome(req, res) {
        res.render('home', { isAuthenticated: req.isAuthenticated });
    }

    showAboutUs(req, res) {
        res.render('about_us', { isAuthenticated: req.isAuthenticated });
    }

    showContact(req, res) {
        res.render('contact', { isAuthenticated: req.isAuthenticated });
    }
}

module.exports = new SiteController;