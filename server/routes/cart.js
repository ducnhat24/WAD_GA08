const express = require("express");
const cartRoute = express.Router();
const User = require("../schemas/User"); // Import model User

// Thêm sản phẩm vào giỏ hàng
cartRoute.post("/add", async (req, res) => {
  const { userId, productId, quantity } = req.body;

  try {
    // Tìm người dùng
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Kiểm tra xem sản phẩm đã tồn tại trong giỏ chưa
    const cartItem = user.cart.find(
      (item) => item.productId.toString() === productId
    );

    if (cartItem) {
      // Nếu đã tồn tại, cập nhật số lượng
      cartItem.quantity += quantity;
    } else {
      // Nếu chưa tồn tại, thêm sản phẩm mới
      user.cart.push({ productId, quantity });
    }

    // Lưu thay đổi
    await user.save();
    res.status(200).json({ message: "Product added to cart", cart: user.cart });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error adding to cart", error: error.message });
  }
});
// Xóa sản phẩm khỏi giỏ hàng
cartRoute.delete("/delete", async (req, res) => {
  const { userId, productId } = req.body;

  try {
    // Tìm người dùng
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Lọc bỏ sản phẩm có `productId` ra khỏi giỏ hàng
    user.cart = user.cart.filter(
      (item) => item.productId.toString() !== productId
    );

    // Lưu thay đổi
    await user.save();
    res
      .status(200)
      .json({ message: "Product removed from cart", cart: user.cart });
  } catch (error) {
    res.status(500).json({
      message: "Error removing product from cart",
      error: error.message,
    });
  }
});
// Cập nhật số lượng sản phẩm trong giỏ hàng
cartRoute.put("/update", async (req, res) => {
  const { userId, productId, quantity } = req.body;

  try {
    // Tìm người dùng
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Tìm sản phẩm trong giỏ hàng
    const cartItem = user.cart.find(
      (item) => item.productId.toString() === productId
    );

    if (!cartItem) {
      return res.status(404).json({ message: "Product not found in cart" });
    }

    // Cập nhật số lượng
    cartItem.quantity = quantity;

    // Lưu thay đổi
    await user.save();
    res
      .status(200)
      .json({ message: "Cart updated successfully", cart: user.cart });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating cart", error: error.message });
  }
});
// Lấy danh sách sản phẩm trong giỏ hàng
cartRoute.get("/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    // Tìm người dùng
    const user = await User.findById(userId).populate("cart.productId");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Trả về giỏ hàng
    res.status(200).json({ cart: user.cart });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error retrieving cart", error: error.message });
  }
});

module.exports = cartRoute;
