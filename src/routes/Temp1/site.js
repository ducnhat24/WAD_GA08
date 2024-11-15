const express = require('express');
const router = express.Router();

const SiteController = require('../../controller/SiteController');
const productRouter = require('./product');

router.get('/', SiteController.showHome);
router.get('/about_us', SiteController.showAboutUs);
router.get('/contact', SiteController.showContact);
router.get('/login', SiteController.showLogin);
router.get('/signup', SiteController.showSignup);
router.use('/product', productRouter);

module.exports = router;