const express = require('express');
const router = express.Router();
const SiteController = require('../controller/SiteController');

router.get('/', SiteController.showHome);
router.get('/about_us', SiteController.showAboutUs);
router.get('/contact', SiteController.showContact);

module.exports = router;