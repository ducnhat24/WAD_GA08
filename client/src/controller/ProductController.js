const ProductService = require("../models/ProductService")

class ProductController {
    async showProduct(req, res) {
        try {
            console.log("---------------------------------");
            console.log("New request to show product");
            const time1 = new Date().getTime();

            let productItems = {
                products: null,
                brands: null,
                models: null,
            }
            // const valueProducts = await ProductService.getProductList();
            // if (valueProducts.status === 'success') {
            //     productItems.products = valueProducts.data;
            // } else {
            //     console.log(valueProducts.message);
            // }

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
            const time2 = new Date().getTime();
            console.log("Time to fetch data from db:", time2 - time1);


            res.render('product', { brands: productItems.brands, models: productItems.models })
            const time3 = new Date().getTime();
            console.log("Time to render:", time3 - time2);
            console.log("---------------------------------");
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
            // const sameProducts = await ProductService.getSameProducts(value.data.brand, value.data.model);
            if (value.status === 'success') {
                res.render('product_details', { product: value.data });
            } else {
                console.log(value.message);
            }
        } catch (err) {
            console.log(err.message)
        }
    }

}

module.exports = new ProductController;