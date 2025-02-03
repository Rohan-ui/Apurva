const express = require('express');
const router = express.Router();
const {getRelatedProducts,getAllProductTitles,getDataBySlug,getProductsByCategory, getActiveProducts,countProducts, insertProduct, updateProduct, deleteProduct, getAllProducts, getSingleProduct, getCategoryProducts, deletePhotoAndAltText, exportProductsToExcel, importProducts, fetchUrlPriorityFreq, editUrlPriorityFreq, fetchUrlPriorityFreqById, fetchUrlmeta, editUrlmeta, fetchUrlmetaById, downloadCatalogue, viewCatalogue } = require('../controller/product')
const { uploadPhoto } = require('../middleware/fileUpload')
const {getCategoryAndPhoto,insertCategory,updateCategory, deletecategory, getAll, getSpecificCategory, fetchCategoryUrlPriorityFreq, editCategoryUrlPriorityFreq, fetchCategoryUrlPriorityFreqById, fetchCategoryUrlmeta, editCategoryUrlmeta, fetchCategoryUrlmetaById } = require('../controller/productcategory')
const { requireAuth } = require('../middleware/authmiddleware');
const { uploadfiles } = require('../middleware/files');
const { uploadLogo } = require("../middleware/logoUpload")

router.post('/insertProduct', requireAuth, uploadPhoto, insertProduct)
router.get('/getAllProducts', requireAuth, getAllProducts)
router.get('/getAllProductTitles', getAllProductTitles)
router.get('/getRelatedProducts', getRelatedProducts)
router.get('/getActiveProducts', getActiveProducts)
router.get('/getDataBySlug', getDataBySlug)
router.get('/getProductsByCategory', getProductsByCategory)
router.put('/updateProduct', requireAuth, uploadPhoto, updateProduct)
router.delete('/deleteProduct', requireAuth, deleteProduct)
router.get('/getSingleProduct', requireAuth, getSingleProduct)
router.get('/getCategoryProducts', requireAuth, getCategoryProducts)
// router.get('/getSubcategoryProducts', requireAuth, getSubcategoryProducts)
// router.get('/getSubSubcategoryProducts', requireAuth, getSubSubcategoryProducts)
router.get('/countProduct', requireAuth, countProducts)
router.delete('/:slugs/image/:imageFilename/:index', requireAuth, deletePhotoAndAltText)
router.get('/exportProduct', requireAuth, exportProductsToExcel)
router.post('/importProduct', requireAuth, uploadfiles, importProducts)
router.get('/fetchUrlPriorityFreq', requireAuth, fetchUrlPriorityFreq)
router.put('/editUrlPriorityFreq', requireAuth, editUrlPriorityFreq)
// router.delete('/deleteUrlPriorityFreq',requireAuth,deleteUrlPriorityFreq)
router.get('/fetchUrlPriorityFreqById', requireAuth, fetchUrlPriorityFreqById)
router.get('/fetchUrlmeta', fetchUrlmeta)
router.put('/editUrlmeta', requireAuth, editUrlmeta)
router.get('/fetchUrlmetaById', requireAuth,fetchUrlmetaById)
router.get('/download/:filename', downloadCatalogue);
router.get('/view/:filename', viewCatalogue);


router.post('/insertCategory', requireAuth, uploadLogo, insertCategory)
// router.post('/insertSubCategory', requireAuth, uploadLogo, insertSubCategory)
// router.get('/getAllSubCategoryDetails', getAllSubCategoryDetails)
// router.get('/getCategoryAndSubCategoryDetails', getCategoryAndSubCategoryDetails)
// router.get('/getSubCategoriesByCategory', getSubCategoriesByCategory)
// router.get('/getSubCategoryDetails', getSubCategoryDetails)
router.get('/getCategoryAndPhoto', getCategoryAndPhoto)
router.put('/updateCategory', requireAuth, uploadLogo, updateCategory)
// router.put('/updateSubCategory', requireAuth, uploadLogo, updateSubCategory)
router.delete('/deletecategory', requireAuth, deletecategory)
// router.delete('/deletesubcategory', requireAuth, deletesubcategory)
router.get('/getAll', requireAuth, getAll)
router.get('/getSpecificCategory', requireAuth, getSpecificCategory)
// router.get('/getSpecificSubcategory', requireAuth, getSpecificSubcategory)
router.get('/fetchCategoryUrlPriorityFreq', requireAuth, fetchCategoryUrlPriorityFreq)
router.put('/editCategoryUrlPriorityFreq', requireAuth, editCategoryUrlPriorityFreq)
// router.delete('/deleteCategoryUrlPriorityFreq',requireAuth,deleteCategoryUrlPriorityFreq)
router.get('/fetchCategoryUrlPriorityFreqById', requireAuth, fetchCategoryUrlPriorityFreqById)
router.get('/fetchCategoryUrlmeta', fetchCategoryUrlmeta)
router.put('/editCategoryUrlmeta', requireAuth, editCategoryUrlmeta)
router.get('/fetchCategoryUrlmetaById', requireAuth, fetchCategoryUrlmetaById)




module.exports = router;