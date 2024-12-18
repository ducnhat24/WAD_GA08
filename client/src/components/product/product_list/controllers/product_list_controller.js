// const productRouter = require("../../../../../../server/routes/product");
const ProductListService = require("../models/product_list_service");

class ProductListController {
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
            const valueProducts = await ProductListService.getProductList();
            if (valueProducts.status === 'success') {
                productItems.products = valueProducts.data;
            } else {
                console.log(valueProducts.message);
            }
            const time2 = new Date().getTime();
            console.log("Time to fetch data from db:", time2 - time1);
            const time3 = new Date().getTime();
            console.log("Time to render:", time3 - time2);
            console.log("---------------------------------");
            res.render('product', productItems);
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
            const valueProducts = await ProductListService.getProductFilter(query);
            if (valueProducts.status === 'success') {
                productItems.products = valueProducts.data;
            } else {
                console.log(valueProducts.message);
            }

            const valueBrands = await ProductListService.getBrandList();
            if (valueBrands.status === 'success') {
                productItems.brands = valueBrands.data;
            } else {
                console.log(valueBrands.message);
            }

            const valueModels = await ProductListService.getModelList();
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

}

module.exports = new ProductListController;