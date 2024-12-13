const express = require('express');
const path = require('path');
const app = express();
const port = 5000;
const { engine } = require('express-handlebars');
const { route } = require('./routes/index');
const cookieParser = require('cookie-parser');
app.use(express.json());
// Cấu hình Handlebars với extension mặc định
app.engine("handlebars", engine({
  layoutsDir: path.join(__dirname, "views/layouts"), // Thư mục chứa layout
  defaultLayout: "main", // Layout mặc định
  partialsDir: path.join(__dirname, "views/partials"), // Thư mục chứa partial
  extname: ".handlebars", // Sử dụng phần mở rộng .handlebars
  helpers: {
    eqString: (a, b) => String(a) === String(b),
    includes: (item, array) => Array.isArray(array) && array.includes(item),
    formatPrice: (price) => {
      return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },
    formatDate: (input) => {
      const date = new Date(input);
      const day = date.getDate();
      const month = date.getMonth() + 1;
      const year = date.getFullYear();
      return `${day}/${month}/${year}`;
    }
  },
}));
app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));
app.use(cookieParser());

route(app);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
