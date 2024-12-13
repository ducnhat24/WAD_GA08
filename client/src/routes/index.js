const express = require('express');
const siteRoute = require('./site');
const productRoute = require('./product');
const userRoute = require('./user');
const adminRoute = require('./admin');

function route(app) {
    app.use('/', siteRoute);
    app.use('/product', productRoute)
    app.use('/user', userRoute);
    app.use('/admin', adminRoute);
}

module.exports = { route };