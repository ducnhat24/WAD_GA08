const Product = require("../schemas/Product");

class ProductService {

    async getAllProducts() {
        try {
            const products = await Product.find();
            return {
                status: "success",
                msg: "Products fetched successfully",
                data: products
            }
        }
        catch (error) {
            console.error(error);
            return {
                status: "error",
                msg: "An error occurred while fetching products",
            }
        }
    }

    async getProductById(id) {
        try {
            const product = await Product.findById(id);
            return product;
        } catch (error) {
            console.error(error);
            throw new Error("An error occurred while fetching product details");
        }
    }

    async searchProduct(query) {
        // try {
        //     const products = await prisma.product.findMany({
        //         where: {
        //             OR: [
        //                 { name: { contains: query } },
        //                 { description: { contains: query } }
        //             ]
        //         },
        //         select: {
        //             id: true,
        //             name: true,
        //             price: true,
        //             description: true,
        //             image: true,
        //         }
        //     });
        //     return products || [];
        // } catch (error) {
        //     console.error(error);
        //     throw new Error("An error occurred while searching for products");
        // }
        try {
            const products = await Product.find({
                $or: [
                    { name: { $regex: query, $options: 'i' } },
                    { description: { $regex: query, $options: 'i' } },
                    { brand: { $regex: query, $options: 'i' } },
                    { model: { $regex: query, $options: 'i' } }
                ]
            });
            return products;
        } catch (error) {
            console.error(error);
            throw new Error("An error occurred while searching for products");
        }
    }

    async getSameProduct(product) {
        try {
            const { _id, brand, model } = product;
            const allSameProducts = await Product.find({ model });
            const sameProducts = allSameProducts.filter((p) => !p._id.equals(_id));
            if (sameProducts.length > 3) {
                return sameProducts.slice(0, 3);
            }
            return sameProducts;
        }
        catch (error) {
            console.error(error);
            throw new Error("An error occurred while fetching similar products");
        }
    }


    async filterProduct(query) {
        try {
            const brandArray = query.brands ? query.brands.split(",") : [];
            const modelArray = query.models ? query.models.split(",") : [];
            const sortBy = query.sortby;
            const sortType = query.sorttype;

            console.log(brandArray);
            let products = await Product.find();
            if (brandArray.length > 0) {
                products = products.filter((product) => brandArray.includes(product.brand));
            }

            if (modelArray.length > 0) {
                products = products.filter((product) => modelArray.includes(product.model));
            }

            if (sortBy && sortType) {
                if (sortType === "asc") {
                    products.sort((a, b) => (a[sortBy] > b[sortBy]) ? 1 : -1);
                } else {
                    products.sort((a, b) => (a[sortBy] < b[sortBy]) ? 1 : -1);
                }
            }

            return products;
        } catch (error) {
            console.error(error);
            throw new Error("An error occurred while filtering products");

        }
    }

    async getAllBrands() {
        try {
            const brands = await Product.find().distinct('brand');
            return brands;
        } catch (error) {
            console.error(error);
            throw new Error("An error occurred while fetching brands");
        }
    }

    async getAllModels() {
        try {
            const models = await Product.find().distinct('model');
            return models;
        } catch (error) {
            console.error(error);
            throw new Error("An error occurred while fetching models");
        }
    }
}

module.exports = ProductService;