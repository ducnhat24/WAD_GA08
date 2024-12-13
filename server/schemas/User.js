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
    required: false, //để false vì khi đăng nhập bằng google sẽ không cần password
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
  googleId: {
    type: String,
    required: false, // Chỉ cần cho OAuth
    unique: true, // Đảm bảo mỗi Google ID là duy nhất
    sparse: true, // Để không bắt buộc trường này khi user đăng ký bằng cách khác
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
