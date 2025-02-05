const ChemicalFertilizers = require('../model/industry');
const path = require('path');

// Create Chemical Fertilizer
exports.createChemicalFertilizer = async (req, res) => {
    try {
        const { title } = req.body;
        const imagePath = req.files['image'] ? req.files['image'][0].filename : null;
        const iconPath = req.files['icon'] ? req.files['icon'][0].filename : null;

        if (!imagePath || !iconPath) return res.status(400).json({ message: 'Image and Icon are required.' });

        const newFertilizer = new ChemicalFertilizers({
            title,
            image: imagePath,
            icon: iconPath
        });

        await newFertilizer.save();
        res.status(201).json({ message: 'Chemical Fertilizer created successfully', data: newFertilizer });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
};

// Get All Chemical Fertilizers
exports.getAllChemicalFertilizers = async (req, res) => {
    try {
        const fertilizers = await ChemicalFertilizers.find();
        res.status(200).json(fertilizers);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
};

// Get Chemical Fertilizer by ID
exports.getChemicalFertilizerById = async (req, res) => {
    try {
        const fertilizer = await ChemicalFertilizers.findById(req.params.id);
        if (!fertilizer) return res.status(404).json({ message: 'Fertilizer not found' });
        res.status(200).json(fertilizer);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
};

// Update Chemical Fertilizer
exports.updateChemicalFertilizer = async (req, res) => {
    try {
        const { title } = req.body;
        const imagePath = req.files['image'] ? req.files['image'][0].filename : undefined;
        const iconPath = req.files['icon'] ? req.files['icon'][0].filename : undefined;

        const updatedData = { title };
        if (imagePath) updatedData.image = imagePath;
        if (iconPath) updatedData.icon = iconPath;

        const updatedFertilizer = await ChemicalFertilizers.findByIdAndUpdate(
            req.params.id,
            updatedData,
            { new: true }
        );

        if (!updatedFertilizer) return res.status(404).json({ message: 'Fertilizer not found' });

        res.status(200).json({ message: 'Fertilizer updated successfully', data: updatedFertilizer });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
};

// Delete Chemical Fertilizer
exports.deleteChemicalFertilizer = async (req, res) => {
    try {
        const deletedFertilizer = await ChemicalFertilizers.findByIdAndDelete(req.params.id);
        if (!deletedFertilizer) return res.status(404).json({ message: 'Fertilizer not found' });

        res.status(200).json({ message: 'Fertilizer deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
};