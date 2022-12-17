const { Schema, model } = require('mongoose');

const cartItemSchema = Schema({
    product: {
        type: Schema.Types.ObjectId,
        ref: "Product",
        required: true
    },
    price: Number,
    count: {
        type: Number,
        default: 1,
        min: 1,
        max: 5
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {timestamps: true});

module.exports.cartItemSchema = cartItemSchema;
module.exports.CartItem = model('CartItem', cartItemSchema);