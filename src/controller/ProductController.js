
class ProductController {
    getAllProducts(req, res) {
        res.send('Get all products');
    }

    getProductDetails(req, res) {
        res.send('Get product details');
    }
}

module.exports = new ProductController;