const express = require('express');
const path = require('path');
// const { PrismaClient } = require('@prisma/client');
const app = express();
const port = 3000;
const { engine } = require('express-handlebars');
const { route } = require('./routes/index');
const cookieParser = require('cookie-parser');
const seed = require('./config/seed');
app.use(express.json());
// const prisma = new PrismaClient();
const db = require('./config/index');
db.connect();

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());

// Example route using Prisma
app.get('/users', async (req, res) => {
    const users = await prisma.user.findMany();
    res.json(users);
});

route(app);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});