const express = require('express');
const siteRouter = require('./Temp1/site');
const apiRouter = require('./Temp2/api');

function route(app) {
    // app.get('/product', (req, res) => {
    //     res.render('product');
    // });

    // app.get('/', (req, res) => {
    //     res.render('home');
    // });

    // app.get('/about_us', (req, res) => {
    //     res.render('about_us');
    // });

    // app.get('/contact', (req, res) => {
    //     res.render('contact');
    // });

    // app.get('/login', (req, res) => {
    //     res.render('login');
    // });

    // app.get('/signup', (req, res) => {
    //     res.render('signup');
    // });

    // app.get('/product/product_details', (req, res) => {
    //     res.render('product_details');
    // });
    app.use('/', siteRouter);
    app.use('/api', apiRouter);
}

module.exports = { route };