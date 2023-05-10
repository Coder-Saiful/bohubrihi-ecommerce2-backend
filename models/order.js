const {Schema, model} = require('mongoose');
const { cartItemSchema } = require('./cartItem');

module.exports.Order = model('Order', new Schema({
    cartItems: [cartItemSchema],
    transaction_id: {
        type: String,
        unique: true
    },
    address: {
        phone: String,
        address1: String,
        address2: String,
        city: String,
        state: String,
        postcode: String,
        country: String
    },
    status: {
        type: String,
        enum: ["pending", "complete"],
        default: "pending"
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    sessionKey: String
}, {timestamps: true}));