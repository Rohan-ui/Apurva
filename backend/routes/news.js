const express = require('express');
const router = express.Router();

const {getDataBySlug,getActiveNews, getBlogsByCategory,getLatestActiveNews,insertNews, getNews,updateNews, deleteNews, getNewsById, countNews, deletePhotoAndAltText, fetchUrlPriorityFreq, editUrlPriorityFreq, fetchUrlPriorityFreqById,fetchUrlmeta, editUrlmeta, fetchUrlmetaById  } = require('../controller/news');
const { getSpecificCategoryDetails,insertCategory,getCategoryAndPhoto, updateCategory, deletecategory, getAll, getSpecificCategory, fetchCategoryUrlPriorityFreq  } = require('../controller/newsCategory')
const { uploadLogo } = require("../middleware/logoUpload")

const { uploadPhoto } = require('../middleware/fileUpload');
const { requireAuth } = require('../middleware/authmiddleware');

router.post('/insertNews', requireAuth, uploadPhoto, insertNews,);
router.get('/getNews',requireAuth, getNews);
router.get('/getDataBySlug', getDataBySlug)
router.get('/getActiveNews', getActiveNews);
router.get('/getLatestActiveNews', getLatestActiveNews);
router.put('/updateNews', requireAuth, uploadPhoto, updateNews);
router.delete('/deleteNews', requireAuth, deleteNews);
router.get('/getNewsById', getNewsById);
router.get('/countNews', requireAuth, countNews);
router.delete('/:slugs/image/:imageFilename/:index', requireAuth, deletePhotoAndAltText);
router.get('/fetchUrlPriorityFreq', requireAuth, fetchUrlPriorityFreq)
router.put('/editUrlPriorityFreq', requireAuth, editUrlPriorityFreq)
router.get('/fetchUrlPriorityFreqById', fetchUrlPriorityFreqById)
router.get('/fetchUrlmeta', fetchUrlmeta)
router.put('/editUrlmeta', requireAuth, editUrlmeta)
router.get('/fetchUrlmetaById', requireAuth, fetchUrlmetaById)
router.get('/getBlogByCategory',getBlogsByCategory);


router.post('/insertCategory', requireAuth, uploadLogo, insertCategory)
router.put('/updateCategory', requireAuth, uploadLogo, updateCategory)
router.delete('/deletecategory', requireAuth, deletecategory)
router.get('/getAll', requireAuth, getAll)
router.get('/getSpecificCategoryDetails', getSpecificCategoryDetails)
router.get('/getSpecificCategory', requireAuth, getSpecificCategory)
router.get('/fetchCategoryUrlPriorityFreq', fetchCategoryUrlPriorityFreq)
// router.put('/editCategoryUrlPriorityFreq', requireAuth, editCategoryUrlPriorityFreq)
// router.get('/fetchCategoryUrlPriorityFreqById', requireAuth, fetchCategoryUrlPriorityFreqById)
// router.get('/fetchCategoryUrlmeta', fetchCategoryUrlmeta)
// router.put('/editCategoryUrlmeta', requireAuth, editCategoryUrlmeta)
// router.get('/fetchCategoryUrlmetaById', requireAuth, fetchCategoryUrlmetaById)
router.get('/getCategoryAndPhoto', getCategoryAndPhoto)

module.exports = router;
