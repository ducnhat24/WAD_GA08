const express = require('express');
const router = express.Router();
const UserController = require('../controller/UserController');

router.get('/cart', UserController.showUserCard)
router.get('/order', UserController.showUserOrder)

module.exports = router;