const express = require('express');
const router = express.Router();

const ProductController = require('../controller/ProductController');

router.get('/', ProductController.showProduct);
router.get('/product_details/:id', ProductController.showProductDetails);
router.get('/search', ProductController.searchProduct);

module.exports = router;

