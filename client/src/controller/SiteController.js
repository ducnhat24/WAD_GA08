class SiteController {
    showHome(req, res) {
        res.render('home');
    }

    showAboutUs(req, res) {
        res.render('about_us');
    }

    showContact(req, res) {
        res.render('contact');
    }

    showLogin(req, res) {
        res.render('login');
    }

    showSignup(req, res) {
        res.render('signup');
    }
}

module.exports = new SiteController;