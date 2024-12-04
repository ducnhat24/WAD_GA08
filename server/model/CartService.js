const User = require("../schemas/User"); // Import model User


class CartService {
    async addProductToCart({ userID, productID, quantity }) {
        try {
            // Tìm người dùng
            const user = await User.findOne({ _id: userID });
            if (!user) {
                return { status: 'error', message: "User not found" };
            }

            // Kiểm tra xem sản phẩm đã tồn tại trong giỏ chưa
            const cartItem = user.cart.find(
                (item) => item.productId === productID
            );

            if (cartItem) {
                // Nếu đã tồn tại, cập nhật số lượng
                cartItem.quantity += quantity;
            } else {
                // Nếu chưa tồn tại, thêm sản phẩm mới
                user.cart.push({ productId: productID, quantity });
            }

            console.log(user);
            console.log(user.cart);
            // Lưu thay đổi
            await user.save();
            return { status: 'success', message: "Product added to cart", cart: user.cart }
        } catch (error) {
            return { status: 'error', message: error.message }
        }

    }
    // Kiểm tra xem sản phẩm đã tồn tại trong giỏ chưa

    async removeProductFromCart({ userID, productID }) {
        try {
            // Tìm người dùng
            const user = await User.findOne({ _id: userID });
            if (!user) {
                return { status: 'error', message: "User not found" };
            }

            // Lọc bỏ sản phẩm có `productID` ra khỏi giỏ hàng
            user.cart = user.cart.filter(
                (item) => item.productID.toString() !== productID
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

    async updateProductInCart({ userID, productID, quantity }) {
        try {
            // Tìm người dùng
            const user = await User.findOne({ _id: userID });
            if (!user) {
                return { status: 'error', message: "User not found" };
            }

            const newProductCart = user.cart.map((cart) => {
                if (cart.productID.toString() === productID) {
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

    async getCart(userID) {
        try {
            // Tìm người dùng
            const user = await User.findOne({ _id: userID });
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