const express = require('express');
const router = express.Router();
const footerController = require('../controller/footer');
const { requireAuth } = require('../middleware/authmiddleware');

router.get('/getFooter', footerController.getFooter);
router.get('/getAddressAndLocation', footerController.getAddressAndLocation);
router.put('/updateFooter', requireAuth,footerController.updateFooter);

module.exports = router;
