const ProductService = require('../model/ProductService');
const productService = new ProductService();
// const { multipleMongooseToObject, mongooseToObject } = require('../utils/mongoose');
class ProductController {

    async getProduct(req, res) {
        // const { keysearch, brands, models, price, sort } = req.query;  // Lấy các tham số từ query

        // Fetch sản phẩm từ productService
        // const value = await productService.getAllProducts();
        // const brands = await productService.getAllBrands();
        // const models = await productService.getAllModels();
        try {
            const value = await productService.getAllProducts();
            res.json(value);
            // const brands = await productService.getAllBrands();
            // const models = await productService.getAllModels();
        }
        catch (error) {
            console.error(error);
            return {
                status: 'error',
                message: error.message,
            }
        }
    }

    async getProductDetails(req, res) {
        const productId = req.params.id;

        try {
            const product = await productService.getProductById(productId);
            res.json(product);
            //     const sameProducts = await productService.getSameProduct(product);
            //     res.render('product_details', { isAuthenticated: req.isAuthenticated, product: mongooseToObject(product), sameProducts: multipleMongooseToObject(sameProducts) });
        } catch (error) {
            return {
                status: 'error',
                message: error.message,
            }
        }
    }

    async getAllBrands(req, res) {
        console.log("Access")
        try {
            const value = await productService.getAllBrands();
            res.json(value);
        }
        catch (error) {
            return {
                status: 'error',
                message: error.message,
            }
        }
    }

    async getAllModels(req, res) {
        try {
            const value = await productService.getAllModels();
            res.json(value);
        }
        catch (error) {
            return {
                status: 'error',
                message: error.message,
            }
        }
    }

    // async searchProduct(req, res) {
    //     const { keysearch, brands, models, price, sort } = req.query;

    //     if (!keysearch) {
    //         return res.redirect('/product');
    //     }

    //     try {
    //         const products = await productService.searchProduct(keysearch);

    //         const allBrands = await productService.getAllBrands();
    //         const allModels = await productService.getAllModels();

    //         // Trả lại các tham số để giữ lại trạng thái tìm kiếm và bộ lọc
    //         res.render('product', {
    //             isAuthenticated: req.isAuthenticated,
    //             products: multipleMongooseToObject(products),
    //             // searchValue: keysearch,
    //             // selectedBrands: brands ? brands.split(',') : [],
    //             // selectedModels: models ? models.split(',') : [],
    //             selectedPrice: price || 1000,
    //             selectedSort: sort || '',
    //             brands: allBrands,
    //             models: allModels
    //         });
    //     } catch (error) {
    //         console.error(error);
    //         res.status(500).send("An error occurred while fetching products");
    //     }
    // }


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
    // async filterProduct(req, res) {
    //     const query = req.query;  // Lấy các tham số từ query
    //     // const brands = await productService.getAllBrands();
    //     // const models = await productService.getAllModels();

    //     try {
    //         const products = await productService.filterProduct(query);
    //         const sort = query.sortby + "_" + query.sorttype;
    //         // Trả lại các tham số để giữ lại trạng thái bộ lọc
    //         // res.render('product', {
    //         //     products: multipleMongooseToObject(products),
    //         //     searchValue: '',  // Có thể để rỗng nếu không có tìm kiếm
    //         //     selectedBrands: query.brands ? query.brands.split(',') : [],
    //         //     selectedModels: query.models ? query.models.split(',') : [],
    //         //     selectedSort: sort || '',
    //         // });
    //         res.json(products)
    //     } catch (error) {
    //         console.error(error);
    //         res.status(500).send("An error occurred while fetching products");
    //     }
    // }

    async filterProduct(req, res) {
        console.log("Filter products");
        try {
            console.log(req.body);
            const { page, limit, brands, models, sorttype, sortby } = req.body;
            const query = {
                brands: brands ? brands.split(',') : [],
                models: models ? models.split(',') : [],
                sortType: sorttype,
                sortBy: sortby
            };
    
            const products = await productService.filterProduct(query);
            const totalPages = Math.ceil(products.data.length / limit);
            const startIndex = (page - 1) * limit;
            const endIndex = page * limit;
            const productToDisplay = products.data.slice(startIndex, endIndex);
    
            res.json({
                currentPage: page,
                totalPages: totalPages,
                item: productToDisplay,
            });
        } catch (error) {
            console.error(error);
            res.status(500).send("An error occurred while fetching products");
        }
    }


    //     async filterProduct(req, res) {
    //         const query = req.query;
    //         const brands = await productService.getAllBrands();
    //         const models = await productService.getAllModels();
    //         if (!query) {
    //             return;
    //         }
    //         try {
    //             const products = await productService.filterProduct(query);
    //             res.render('product', { isAuthenticated: req.isAuthenticated, products: multipleMongooseToObject(products), brands: brands, models: models });
    //         }
    //         catch (error) {
    //             console.error(error);
    //             res.status(500).send("An error occurred while fetching products");
    //         }
    //     }

    async getSomeProduct(req, res) {
        console.log("new try");
        try {
            console.log(req.body);
            const page = parseInt(req.body.page) || 1;
            const limit = parseInt(req.body.limit) || 1;
    
            const startIndex = (page - 1) * limit;
            const endIndex = page * limit;
            console.log('Start Index:', startIndex, 'End Index:', endIndex);
    
            const allProducts = await productService.getAllProducts();
    
            const productToDisplay = allProducts.data.slice(startIndex, endIndex);
            console.log('current page:', page);
            console.log('total pages:', Math.ceil(allProducts.data.length / limit));
    
            res.json({
                currentPage: page,
                totalPages: Math.ceil(allProducts.data.length / limit),
                item: productToDisplay,
            });
    
        } catch (error) {
            console.error(error);
            res.status(500).send("An error occurred while fetching products");
        }
    }
}

module.exports = new ProductController;