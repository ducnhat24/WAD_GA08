const express = require('express');
const router = express.Router();
const AdminController = require('../controller/AdminController');

router.get('/', AdminController.showHome);

router.get('/product', AdminController.showProduct);

module.exports = router;