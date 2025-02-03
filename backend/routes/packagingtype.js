// routes/packagingTypeRoutes.js

const express = require('express');
const router = express.Router();
const packagingTypeController = require('../controller/packagingtype');
const { requireAuth } = require('../middleware/authmiddleware');
const { uploadLogo } = require('../middleware/logoUpload');

router.post('/insertPackagingType', requireAuth, uploadLogo, packagingTypeController.createPackagingType);
router.get('/getPackagingTypes', packagingTypeController.getPackagingTypes);
router.get('/getPackagingTypeById', requireAuth, packagingTypeController.getPackagingTypeById);
router.put('/updatePackagingType', requireAuth, uploadLogo, packagingTypeController.updatePackagingType);
router.delete('/deletePackagingType', requireAuth, packagingTypeController.deletePackagingType);

module.exports = router;
