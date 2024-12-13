const userRoute = require("./user");
const productRoute = require("./product");
const cartRoute = require("./cart");
const { verifyToken } = require("../middleware/JWTAction");
const { authenticateGoogle, handleGoogleCallback } = require('../middleware/GoogleOAuth');


function route(app) {
  app.get('/auth/google', authenticateGoogle);
  app.get('/auth/google/callback', handleGoogleCallback);
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
