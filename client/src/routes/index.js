const express = require('express');
const siteRouter = require('./site');
const productRoute = require('./product');

function route(app) {
    app.use('/', siteRouter);
    app.use('/product', productRoute)
    app.get('/admin', (req, res) => {
        res.render('admin', { layout: 'admin' }); // Render with 'main2.handlebars'
    });
}

module.exports = { route };