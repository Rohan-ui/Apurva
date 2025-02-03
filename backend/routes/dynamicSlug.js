const express = require('express');
const router = express.Router();
const {getAllSlugs} = require('../controller/dynamicslug');

router.get('/getAllSlugs', getAllSlugs);


module.exports = router;