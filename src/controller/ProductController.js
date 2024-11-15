const ProductService = require('../model/ProductService');
const productService = new ProductService();
class ProductController {

    async showProduct(req, res) {
        const products = await productService.getAllProducts();
        res.render('product', { products });

    }

    async showProductDetails(req, res) {
        const productId = req.params.id;
        try {
            const product = await productService.getProductById(productId);
            if (!product) {
                return res.status(404).send('Product not found');
            }
            const sameProducts = await productService.getSameProduct(product);
            res.render('product_details', { product, sameProducts });
        } catch (error) {
            console.error(error);
            res.status(500).send('An error occurred while fetching product details');
        }
    }

    async searchProduct(req, res) {
        const query = req.query.query;
        if (!query) {
            return;
        }
        try {
            const products = await productService.searchProduct(query);
            return res.json(products);
        }
        catch (error) {
            console.error(error);
            res.status(500).send("An error occurred while fetching products");
        }
    }
}

module.exports = new ProductController;