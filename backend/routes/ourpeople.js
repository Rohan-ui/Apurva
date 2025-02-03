const express = require('express');
const router = express.Router();
const ourpeopleController = require('../controller/ourpeople');
const { requireAuth } = require('../middleware/authmiddleware');
const { uploadLogo } = require("../middleware/logoUpload")

router.get('/getOurpeople', ourpeopleController.getOurPeople);
router.put('/updateOurpeople', requireAuth, uploadLogo, ourpeopleController.updateOurPeople);

module.exports = router;
