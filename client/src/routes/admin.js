const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('admin_home', { layout: 'admin' }); // Render with 'main2.handlebars'
});

router.get('/product', (req, res) => {
    res.render('admin_product', { layout: 'admin' }); // Render with 'main2.handlebars'
});

module.exports = router;