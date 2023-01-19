const router = require('express').Router();
const { createCategory, getCategories, updateCategory, deleteCategory, getSingleCategory } = require('../controllers/categoryController');
const authorize = require('../middlewares/authorize');
const admin = require('../middlewares/admin');
 
router.route('/')
    .post([authorize, admin], createCategory)
    .get(getCategories);

router.route('/:id')
    .get(getSingleCategory)
    .put([authorize, admin], updateCategory)
    .delete([authorize, admin], deleteCategory);

module.exports = router;