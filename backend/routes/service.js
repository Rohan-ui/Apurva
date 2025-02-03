const express = require('express');
const router = express.Router();

const {insertService,getAllServices,getAllActiveService,updateService,deleteService,getSingleService, countServices,deletePhotoAndAltText,exportServicesToExcel,importServices,fetchUrlPriorityFreq,editUrlPriorityFreq,fetchUrlPriorityFreqById,fetchUrlmeta, editUrlmeta, fetchUrlmetaById   } = require('../controller/services') 

const {uploadPhoto} = require('../middleware/fileUpload')
const { requireAuth } = require('../middleware/authmiddleware');
const {uploadfiles} = require('../middleware/files');

router.post('/insertService',requireAuth,uploadPhoto,insertService);
router.get('/getService',requireAuth,getAllServices) 
router.get('/getActiveService',requireAuth,getAllActiveService) 
router.put('/updateService',requireAuth, uploadPhoto, updateService);
router.delete('/deleteService',requireAuth,deleteService);
router.get('/singleService',requireAuth,getSingleService)
router.get('/countService',requireAuth,countServices )
router.delete('/:id/image/:imageFilename/:index',requireAuth,deletePhotoAndAltText )
router.get('/exportService',requireAuth,exportServicesToExcel)
router.post('/importService',requireAuth,uploadfiles,importServices);
router.get('/fetchUrlPriorityFreq',requireAuth,fetchUrlPriorityFreq)
router.put('/editUrlPriorityFreq',requireAuth,editUrlPriorityFreq)
router.get('/fetchUrlPriorityFreqById',requireAuth,fetchUrlPriorityFreqById)
router.get('/fetchUrlmeta', requireAuth, fetchUrlmeta)
router.put('/editUrlmeta', requireAuth, editUrlmeta)
router.get('/fetchUrlmetaById', requireAuth, fetchUrlmetaById)

module.exports = router;