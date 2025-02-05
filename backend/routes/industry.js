// routes/chemicalFertilizersRoutes.js
const express = require('express');
const router = express.Router();
const chemicalFertilizersController = require('../controller/industry');
const { uploadImage } = require('../middleware/imageUpload'); // Adjust the path as needed

router.post('/add', uploadImage, chemicalFertilizersController.createChemicalFertilizer);
router.get('/all', chemicalFertilizersController.getAllChemicalFertilizers);
router.get('/:id', chemicalFertilizersController.getChemicalFertilizerById);
router.put('/update/:id', uploadImage, chemicalFertilizersController.updateChemicalFertilizer);
router.delete('/delete/:id', chemicalFertilizersController.deleteChemicalFertilizer);

module.exports = router;