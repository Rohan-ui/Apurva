const express = require('express');
const router = express.Router();
const packagingDetailController = require('../controller/packgingdetail');
const { requireAuth } = require('../middleware/authmiddleware');


router.get('/getPackagingDetail', packagingDetailController.getPackagingDetail);

router.put('/updatePackagingDetail', requireAuth, packagingDetailController.updatePackagingDetail);

module.exports = router;
