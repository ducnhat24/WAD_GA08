class AboutUsController {
    showAboutUs(req, res) {
        res.render('about_us');
    }
}

module.exports = new AboutUsController;