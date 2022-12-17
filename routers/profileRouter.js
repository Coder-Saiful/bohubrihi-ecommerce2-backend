const router = require('express').Router();
const {
    setProfile,
    getProfiile
} = require('../controllers/profiileController');
const authorize = require('../middlewares/authorize');

router.route('/')
    .get(authorize, getProfiile)
    .post(authorize, setProfile);

module.exports = router;