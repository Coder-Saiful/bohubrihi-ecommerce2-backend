const router = require('express').Router();
const { createProduct, getProducts, productDetails, updateProduct, deleteProduct, getProductPhoto, filterProducts } = require('../controllers/productController');
const authorize = require('../middlewares/authorize');
const admin = require('../middlewares/admin');

router.route('/')
    .post([authorize, admin], createProduct)
    .get(getProducts);

router.route('/:id')
    .get(productDetails)
    .put([authorize, admin], updateProduct)
    .delete([authorize, admin], deleteProduct);

router.route('/photo/:id')
    .get(getProductPhoto);

router.route('/filter')
    .post(filterProducts);

module.exports = router;