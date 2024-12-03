const User = require("../schemas/User"); // Import model User


class CartService {
    async addProductToCart({ userId, productId, quantity }) {
        try {
            // Tìm người dùng
            const user = await User.findOne({ _id: userId });
            if (!user) {
                return { status: 'error', message: "User not found" };
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
            return { status: 'success', message: "Product added to cart", cart: user.cart }
        } catch (error) {
            return { status: 'error', message: error.message }
        }

    }
    // Kiểm tra xem sản phẩm đã tồn tại trong giỏ chưa

    async removeProductFromCart({ userId, productId }) {
        try {
            // Tìm người dùng
            const user = await User.findOne({ _id: userId });
            if (!user) {
                return { status: 'error', message: "User not found" };
            }

            // Lọc bỏ sản phẩm có `productId` ra khỏi giỏ hàng
            user.cart = user.cart.filter(
                (item) => item.productId.toString() !== productId
            );

            // Lưu thay đổi
            await user.save();
            return { status: 'success', message: "Product removed from cart" };
        } catch (error) {
            return {
                status: 'error',
                message: error.messag,
            }
        }
    }

    async updateProductInCart({ userId, productId, quantity }) {
        try {
            // Tìm người dùng
            const user = await User.findOne({ _id: userId });
            if (!user) {
                return { status: 'error', message: "User not found" };
            }

            const newProductCart = user.cart.map((cart) => {
                if (cart.productId.toString() === productId) {
                    cart.quantity += Number(quantity);
                }
                return cart;
            });

            user.cart = newProductCart;

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
    }

    async getCart(userId) {
        try {
            // Tìm người dùng
            const user = await User.findOne({ _id: userId });
            if (!user) {
                return { status: 'error', message: "User not found" };
            }
            // Trả về giỏ hàng
            return { status: 'success', message: "Get cart successfully", cart: user.cart };
        } catch (error) {
            return { status: 'error', message: error.message };
        }
    }
}

module.exports = CartService;