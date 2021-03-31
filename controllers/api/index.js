const router = require('express').Router();
const userRoutes = require('./userRoutes');
const parkRoutes = require('./parkRoutes')

router.use('/users', userRoutes);
router.use('/parks', parkRoutes);

module.exports = router;
