const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/JWTAction');
const ProductController = require('../controller/ProductController');

router.get('/', verifyToken, ProductController.showProduct);
router.get('/product_details/:id', verifyToken, ProductController.showProductDetails);
router.get('/search', verifyToken, ProductController.searchProduct);
router.get('/filter', verifyToken, ProductController.filterProduct);

module.exports = router;

