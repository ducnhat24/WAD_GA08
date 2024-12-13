const AdminService = require('../models/AdminService');
const ProductService = require('../models/ProductService');

class AdminController {
    showHome(req, res) {
        res.render('admin_home', { layout: 'admin' }); // Render with 'main2.handlebars'
    }

    async showProduct(req, res) {
        const resultProduct = await ProductService.getProductList();
        const resultBrand = await ProductService.getBrandList();
        res.render('admin_product', { layout: 'admin', products: resultProduct.data, brands: resultBrand.data }); // Render with 'main2.handlebars'
    }

    async showSetting(req, res) {
        // const resultModel = await ProductService.getModelList();
        res.render('admin_setting', { layout: 'admin' }); // Render with 'main2.handlebars'
    }
}

module.exports = new AdminController;