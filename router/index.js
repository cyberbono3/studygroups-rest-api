var express = require('express');
var router = express.Router();

/* GET home page. */
router.use('/auth', require('./routes/auth'));
router.use('/studygroup', require('./routes/studygroup'));

module.exports = router;