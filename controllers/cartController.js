const { CartItem } = require('../controllers/categoryController');
const _ = require('lodash');

module.exports.createCartItem = async (req, res) => {
    const { product, price } = _.pick(req.body, ["product", "price"]);
    const userId = req.user._id;
    const item = await CartItem.findOne({ user:  userId, product: product });
    if (item) {
        return res.status(400).send({ message: "Item already exists in cart!" });
    } else {
        const cartItem = new CartItem({
            user: userId,
            price: price,
            product: product
        });
        const result = await cartItem.save();
        return res.status(201).send({
            message: "Added to cart successfully",
            data: result
        });
    }
}

module.exports.getCartItem = async (req, res) => {
    const userId = req.user._id;
    const cartItems = await CartItem.find({user: userId})
        .populate('product', 'name')
        .populate('user', 'name');
    return res.status(200).send(cartItems);
}

module.exports.updateCartItem = async (req, res) => {
    const {_id, count} = _.pick(req.body, ["_id", "count"]);
    const userId = req.user._id;
    await CartItem.updateOne({ user: userId, _id: _id }, {count: count});
    return res.status(200).send({ message: "Cart item updated!" });
}

module.exports.deleteCartItem = async (req, res) => {
    const _id = req.params.id;
    const userId = req.user._id;
    await CartItem.deleteOne({ user: userId, _id: _id });
    return res.status(200).send({message: "Cart item removed successfully!"});
}