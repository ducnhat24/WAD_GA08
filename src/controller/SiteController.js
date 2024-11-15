const ProductService = require('../model/ProductService');
const productService = new ProductService();


class SiteController {
    showHome(req, res) {
        res.render('home');
    }

    showAboutUs(req, res) {
        res.render('about_us');
    }

    showContact(req, res) {
        res.render('contact');
    }

    showLogin(req, res) {
        res.render('login');
    }

    showSignup(req, res) {
        res.render('signup');
    }

    async showProduct(req, res) {
        const products = await productService.getAllProducts();
        console.log(products);
        res.render('product', { products });

    }

    // showProductDetails(req, res) {
    //     res.render('product_details');
    // }

    async showProductDetails(req, res) {
        const productId = req.params.id;
        try {
            const product = await productService.getProductById(productId);
            if (!product) {
                return res.status(404).send('Product not found');
            }
            res.render('product_details', { product });
        } catch (error) {
            console.error(error);
            res.status(500).send('An error occurred while fetching product details');
        }
    }
}

module.exports = new SiteController;