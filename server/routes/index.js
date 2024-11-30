const userRoute = require('./user');
const productRoute = require('./product');

function route(app) {
    app.get('/', (req, res) => {
        res.send('Hello from Express!');
    });
    app.use('/user', userRoute);
    app.use('/product', productRoute);
}

module.exports = { route };