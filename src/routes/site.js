const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/JWTAction');
const SiteController = require('../controller/SiteController');

router.get('/', verifyToken, SiteController.showHome);
router.get('/about_us', verifyToken, SiteController.showAboutUs);
router.get('/contact', verifyToken, SiteController.showContact);

module.exports = router;