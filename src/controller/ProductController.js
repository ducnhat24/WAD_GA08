const ProductService = require('../model/ProductService');
const productService = new ProductService();
const { multipleMongooseToObject, mongooseToObject } = require('../utils/mongoose');
class ProductController {

    async showProduct(req, res) {
        const value = await productService.getAllProducts();
        const products = value.data;
        res.render('product', { isAuthenticated: req.isAuthenticated, products: multipleMongooseToObject(products) });
    }

    async showProductDetails(req, res) {
        const productId = req.params.id;
        try {
            const product = await productService.getProductById(productId);
            if (!product) {
                return res.status(404).send('Product not found');
            }
            const sameProducts = await productService.getSameProduct(product);
            res.render('product_details', { isAuthenticated: req.isAuthenticated, product: mongooseToObject(product), sameProducts: multipleMongooseToObject(sameProducts) });
        } catch (error) {
            console.error(error);
            res.status(500).send('An error occurred while fetching product details');
        }
    }

    async searchProduct(req, res) {
        const query = req.query.keysearch;
        if (!query) {
            return;
        }
        try {
            const products = await productService.searchProduct(query);
            res.render('product', { isAuthenticated: req.isAuthenticated, products: multipleMongooseToObject(products) });
        }
        catch (error) {
            console.error(error);
            res.status(500).send("An error occurred while fetching products");
        }
    }
}

module.exports = new ProductController;