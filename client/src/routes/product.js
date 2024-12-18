const express = require('express');
const router = express.Router();
const ProductListController = require('../components/product/product_list/controllers/product_list_controller');
const ProductDetailsController = require('../components/product/product_details/controllers/product_details_controller');

router.get('/filter', ProductListController.showProductFilter)
router.get('/', ProductListController.showProduct);
router.get('/:id', ProductDetailsController.showProductDetails);

module.exports = router;