const express = require('express');
const router = express.Router();
const productRouter = require('./product');
const userRouter = require('./user');

router.use('/user', userRouter);
router.use('/product', productRouter);

module.exports = router;