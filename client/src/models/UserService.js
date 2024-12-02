const url = 'http://localhost:3000';

class UserService {
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

module.exports = new UserService();