const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: false,
  },
  password: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
  updatedAt: {
    type: Date,
    default: new Date(),
  },
  refreshToken: {
    type: String,
    default: null,
  },
  cart: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId, // Tham chiếu đến `Product`
        ref: "Product", // Model tham chiếu
      },
      quantity: {
        type: Number,
        default: 0, // Số lượng mặc định
      },
    },
  ],
});

const User = mongoose.model("User", userSchema);

module.exports = User;
