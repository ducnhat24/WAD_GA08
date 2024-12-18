const express = require('express');
const router = express.Router();
const CartController = require('../components/cart/controllers/cart_controller');
const OrderController = require('../components/order/controllers/order_controller');

router.get('/cart', CartController.showUserCard)
router.get('/order', OrderController.showUserOrder)

module.exports = router;