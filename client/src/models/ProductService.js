

class ProductService {
    async getProductList() {
        try {
            const response = await fetch("https://wad-ga-06.vercel.app/product/", {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            return data;
        } catch (err) {
            console.log(err.message);
            return null;
        }
    }

    async getBrandList() {
        try {
            const response = await fetch("https://wad-ga-06.vercel.app/product/brands", {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            return data;
        } catch (err) {
            console.log(err.message);
            return null;
        }
    }

    async getModelList() {
        try {
            const response = await fetch("https://wad-ga-06.vercel.app/product/models", {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            return data;
        } catch (err) {
            console.log(err.message);
            return null;
        }
    }

    async getProductFilter(query) {
        const { brands, models, sortby, sorttype } = query;
        let url = 'https://wad-ga-06.vercel.app/product/filter?';
        let flag = false;
        if (brands) {
            url += ("brands=" + brands);
            flag = true;
        }

        if (models) {
            if (flag) {
                url += "&";
            }
            url += ("models=" + models);
        }

        if (sortby) {
            if (flag) {
                url += "&";
            }
            url += ("sortby=" + sortby + "&sorttype=" + sorttype);
        }
        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            return data;
        } catch (err) {
            console.log(err.message);
            return null;
        }
    }

    async getProductDetails(id) {
        try {
            const response = await fetch(`https://wad-ga-06.vercel.app/product/${id}`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            return data;
        } catch (err) {
            console.log(err.message);
            return null;
        }
    }



    // async getSameProduct(product) {
    //     try {
    //         const { _id, brand, model } = product;
    //         const allSameProducts = await Product.find({ model });
    //         const sameProducts = allSameProducts.filter((p) => !p._id.equals(_id));
    //         if (sameProducts.length > 3) {
    //             return sameProducts.slice(0, 3);
    //         }
    //         return sameProducts;
    //     }
    //     catch (error) {
    //         console.error(error);
    //         throw new Error("An error occurred while fetching similar products");
    //     }
    // }
    // rewrite the above function to use fetch
    async getSameProducts(brand, model) {
        try {
            //fetch all products 
            const response = await fetch("https://wad-ga-06.vercel.app/product/", {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            else {
                const responseJson = await response.json();
                const allSameProducts = responseJson.data.filter((p) => p.model === model);
                if (allSameProducts.length > 3) {
                    return allSameProducts.slice(0, 3);
                }
                return allSameProducts;
            }
        }
        catch (error) {
            console.error(error);
            throw new Error("An error occurred while fetching similar products");
        }
    }

}

module.exports = new ProductService;