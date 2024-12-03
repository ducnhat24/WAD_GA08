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
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
    set: function () {
      return Date.now();
    },
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
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
        default: 0, // Số lượng mặc định
      },
    },
  ],
});

const User = mongoose.model("User", userSchema);

module.exports = User;
