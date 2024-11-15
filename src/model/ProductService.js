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
            const allSameProducts = await Product.find({ brand, model });
            const sameProducts = allSameProducts.filter((p) => !p._id.equals(_id));
            return sameProducts;
        }
        catch (error) {
            console.error(error);
            throw new Error("An error occurred while fetching similar products");
        }
    }
}

module.exports = ProductService;