const express = require('express');
const siteRouter = require('./site');
const productRouter = require('./product');
const userRouter = require('./user');

function route(app) {
    app.use('/', siteRouter);
    app.use('/product', productRouter);
    app.use('/user', userRouter);
    app.get('/admin', (req, res) => {
        res.render('admin', { layout: 'admin' }); // Render with 'main2.handlebars'
    });
}

module.exports = { route };