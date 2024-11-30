const ProductService = require("../models/ProductService")

class ProductController {
    async showProduct(req, res) {
        try {
            let productItems = {
                products: null,
                brands: null,
                models: null,
            }
            const valueProducts = await ProductService.getProductList();
            if (valueProducts.status === 'success') {
                productItems.products = valueProducts.data;
            } else {
                console.log(valueProducts.message);
            }

            const valueBrands = await ProductService.getBrandList();
            if (valueBrands.status === 'success') {
                productItems.brands = valueBrands.data;
            } else {
                console.log(valueBrands.message);
            }

            const valueModels = await ProductService.getModelList();
            if (valueModels.status === 'success') {
                productItems.models = valueModels.data;
            } else {
                console.log(valueModels.message);
            }

            res.render('product', { products: productItems.products, brands: productItems.brands, models: productItems.models })
        }
        catch (err) {
            console.log(err.message)
        }
    }

    async showProductFilter(req, res) {
        try {
            const query = req.query;
            console.log(query)
            let productItems = {
                products: null,
                brands: null,
                models: null,
            }
            const valueProducts = await ProductService.getProductFilter(query);
            if (valueProducts.status === 'success') {
                productItems.products = valueProducts.data;
            } else {
                console.log(valueProducts.message);
            }

            const valueBrands = await ProductService.getBrandList();
            if (valueBrands.status === 'success') {
                productItems.brands = valueBrands.data;
            } else {
                console.log(valueBrands.message);
            }

            const valueModels = await ProductService.getModelList();
            if (valueModels.status === 'success') {
                productItems.models = valueModels.data;
            } else {
                console.log(valueModels.message);
            }


            res.render('product', { products: productItems.products, brands: productItems.brands, models: productItems.models })
        } catch (err) {
            console.log(err.message)
        }
    }

    async showProductDetails(req, res) {
        try {
            const id = req.params.id;
            const value = await ProductService.getProductDetails(id);
            const sameProducts = await ProductService.getSameProducts(value.data.brand, value.data.model);
            if (value.status === 'success') {
                res.render('product_details', { product: value.data, sameProducts: sameProducts });
            } else {
                console.log(value.message);
            }
        } catch (err) {
            console.log(err.message)
        }
    }

}

module.exports = new ProductController;