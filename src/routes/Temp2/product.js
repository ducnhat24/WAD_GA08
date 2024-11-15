const express = require('express');
const router = express.Router();

const ProductController = require('../../controller/ProductController');

router.get('/', ProductController.getAllProducts);
router.get('/product_details', ProductController.getProductDetails);

module.exports = router;

