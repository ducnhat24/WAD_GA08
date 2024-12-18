const express = require('express');
const siteRoute = require('./site');
const productRoute = require('./product');
const userRoute = require('./user');

function route(app) {
    app.use('/', siteRoute);
    app.use('/product', productRoute)
    app.use('/user', userRoute);
}

module.exports = { route };