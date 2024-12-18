class ContactController {
    showContact(req, res) {
        res.render('contact');
    }
}

module.exports = new ContactController;