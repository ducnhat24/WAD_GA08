const url = 'https://wad-ga-08.vercel.app';

class CartService {
    async getProductInCard() {
        try {
            const response = await fetch(url + "/product", {
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

module.exports = new CartService();