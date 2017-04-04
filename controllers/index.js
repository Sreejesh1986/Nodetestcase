var router = require('express').Router();

// Routes
router.use('/health', require('./health.js'));

module.exports = router;