

class ProductListService {
    async getProductList() {
        try {
            const response = await fetch("https://wad-ga-08.vercel.app/product/", {
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
            const response = await fetch("https://wad-ga-08.vercel.app/product/brands", {
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
            const response = await fetch("https://wad-ga-08.vercel.app/product/models", {
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
        let url = 'https://wad-ga-08.vercel.app/product/filter?';
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

}

module.exports = new ProductListService;