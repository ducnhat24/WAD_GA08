const ProductService = require('../model/ProductService');
const productService = new ProductService();
const { multipleMongooseToObject, mongooseToObject } = require('../utils/mongoose');
class ProductController {

    // async showProduct(req, res) {
    //     const value = await productService.getAllProducts();
    //     const products = value.data;
    //     res.render('product', { isAuthenticated: req.isAuthenticated, products: multipleMongooseToObject(products) });
    // }
    async showProduct(req, res) {
        const { keysearch, brands, models, price, sort } = req.query;  // Lấy các tham số từ query

        // Fetch sản phẩm từ productService
        const value = await productService.getAllProducts();
        const products = value.data;

        // Truyền các tham số vào view để giữ lại trạng thái tìm kiếm và bộ lọc
        res.render('product', { 
            isAuthenticated: req.isAuthenticated, 
            products: multipleMongooseToObject(products),
            searchValue: keysearch || '',          // Lưu lại giá trị tìm kiếm
            selectedBrands: brands ? brands.split(',') : [],  // Giữ lại các brand đã chọn
            selectedModels: models ? models.split(',') : [],  // Giữ lại các model đã chọn
            selectedPrice: price || 1000,           // Giữ lại giá trị price (range)
            selectedSort: sort || '',              // Giữ lại lựa chọn sắp xếp
    });
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

    // async searchProduct(req, res) {
    //     const query = req.query.keysearch;
    //     if (!query) {
    //         return;
    //     }
    //     try {
    //         const products = await productService.searchProduct(query);
    //         res.render('product', { isAuthenticated: req.isAuthenticated, products: multipleMongooseToObject(products) });
    //     }
    //     catch (error) {
    //         console.error(error);
    //         res.status(500).send("An error occurred while fetching products");
    //     }
    // }
    async searchProduct(req, res) {
        const { keysearch, brands, models, price, sort } = req.query;

        if (!keysearch) {
            return res.redirect('/product');
        }

        try {
            const products = await productService.searchProduct(keysearch);

            // Trả lại các tham số để giữ lại trạng thái tìm kiếm và bộ lọc
            res.render('product', {
                isAuthenticated: req.isAuthenticated,
                products: multipleMongooseToObject(products),
                searchValue: keysearch,
                selectedBrands: brands ? brands.split(',') : [],
                selectedModels: models ? models.split(',') : [],
                selectedPrice: price || 1000,
                selectedSort: sort || ''
            });
        } catch (error) {
            console.error(error);
            res.status(500).send("An error occurred while fetching products");
        }
    }


    // async filterProduct(req, res) {
    //     const brand = req.query.brand;
    //     const model = req.query.model;
    //     const feature = req.query.feature;
    //     const type = req.query.type;

    //     try {
    //         const products = await productService.filterProduct(brand, model, feature, type);
    //         res.render('product', { isAuthenticated: req.isAuthenticated, products: multipleMongooseToObject(products) });
    //     } catch (error) {
    //         console.error(error);
    //         res.status(500).send("An error occurred while fetching products");
    //     }
    // }
    async filterProduct(req, res) {
        const { brand, model, feature, type, price, sort } = req.query;  // Lấy các tham số từ query

        try {
            const products = await productService.filterProduct(brand, model, feature, type);

            // Trả lại các tham số để giữ lại trạng thái bộ lọc
            res.render('product', {
                isAuthenticated: req.isAuthenticated,
                products: multipleMongooseToObject(products),
                searchValue: '',  // Có thể để rỗng nếu không có tìm kiếm
                selectedBrands: brand ? brand.split(',') : [],
                selectedModels: model ? model.split(',') : [],
                selectedPrice: price || 1000,
                selectedSort: sort || ''
            });
        } catch (error) {
            console.error(error);
            res.status(500).send("An error occurred while fetching products");
        }
    }

}

module.exports = new ProductController;