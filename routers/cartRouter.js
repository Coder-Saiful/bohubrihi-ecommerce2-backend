const router = require('express').Router();
const { createCartItem, getCartItem, deleteCartItem, updateCartItem } = require('../controllers/cartController');
const authorize = require('../middlewares/authorize');

router.route('/')
    .post(authorize, createCartItem)
    .get(authorize, getCartItem)
    .put(authorize, updateCartItem);

router.route('/:id')
    .delete(authorize, deleteCartItem);

module.exports = router;