const express = require('express');
const siteRouter = require('./site');
const productRouter = require('./product');
const userRouter = require('./user');

function route(app) {
    app.use('/', siteRouter);
    app.use('/product', productRouter);
    app.use('/user', userRouter);
}

module.exports = { route };