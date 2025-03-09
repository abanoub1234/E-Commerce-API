const Cart = require("../models/Cart");

// Add product to cart
exports.addToCart = async (req, res) => {
    try {
        const { productId, quantity } = req.body;

        let cart = await Cart.findOne({ userId: req.user.id });

        if (!cart) {
            cart = new Cart({ userId: req.user.id, products: [{ productId, quantity }] });
        } else {
            const existingProduct = cart.products.find(p => p.productId.toString() === productId);

            if (existingProduct) {
                existingProduct.quantity += quantity;
            } else {
                cart.products.push({ productId, quantity });
            }
        }

        await cart.save();
        res.status(201).json(cart);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get user cart
exports.getUserCart = async (req, res) => {
    try {
        const cart = await Cart.findOne({ userId: req.user.id }).populate("products.productId");
        if (!cart) return res.status(404).json({ message: "Cart not found" });

        res.json(cart);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Remove product from cart
exports.removeFromCart = async (req, res) => {
    try {
        const { productId } = req.body;
        let cart = await Cart.findOne({ userId: req.user.id });

        if (!cart) return res.status(404).json({ message: "Cart not found" });

        cart.products = cart.products.filter(p => p.productId.toString() !== productId);

        await cart.save();
        res.json(cart);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update order status (Admin only)
exports.updateOrderStatus = async (req, res) => {
    try {
        const { cartId } = req.params;
        const { orderStatus } = req.body;

        const cart = await Cart.findById(cartId);
        if (!cart) return res.status(404).json({ message: "Order not found" });

        cart.orderStatus = orderStatus;
        await cart.save();

        res.json({ message: "Order status updated successfully", cart });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
