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
}

module.exports = new SiteController;