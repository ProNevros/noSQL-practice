const router = require('express').Router();
const userRoutes = require('./userRoutes');
const thoughtRoutes = require('./thoughRoutes');

router.use('/courses', userRoutes);
router.use('/students', thoughtRoutes);

module.exports = router;
