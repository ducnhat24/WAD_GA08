const userRoute = require("./user");
const productRoute = require("./product");
const cartRoute = require("./cart");
const { verifyToken } = require("../middleware/JWTAction");

function route(app) {
  app.get("/", (req, res) => {
    res.send("Hello from Express!");
  });
  app.use("/user", userRoute);
  app.use("/product", productRoute);
  app.use("/cart", cartRoute);

  // Secret route
  app.get("/protectiveroute", verifyToken, (req, res) => {
    res.json({ message: `Success` });
  });
}

module.exports = { route };
