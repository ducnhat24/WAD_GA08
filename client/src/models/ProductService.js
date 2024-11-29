

class ProductService {
    async getProductList() {
        try {
            const response = await fetch("http://localhost:3000/product/", {
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
            const response = await fetch("http://localhost:3000/product/brands", {
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
            const response = await fetch("http://localhost:3000/product/models", {
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
        let url = 'http://localhost:3000/product/filter?';
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

module.exports = new ProductService;