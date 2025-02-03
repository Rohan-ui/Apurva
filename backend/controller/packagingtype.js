const PackagingType = require('../model/packagingtype');
const path = require("path");
const fs = require("fs");

// Create a new PackagingType
exports.createPackagingType = async (req, res) => {
    try {
        const { title, alt, imgTitle } = req.body;
        let photo = "";

        if (req.file) {
            photo = req.file.filename;
        }

        const newPackagingType = new PackagingType({ title, photo, alt, imgTitle });
        await newPackagingType.save();
        res.status(201).json(newPackagingType);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error creating packaging type', error });
    }
};

// Get all PackagingTypes
exports.getPackagingTypes = async (req, res) => {
    try {
        const packagingTypes = await PackagingType.find();
        res.status(200).json(packagingTypes);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching packaging types', error });
    }
};



// Get a single PackagingType by ID
exports.getPackagingTypeById = async (req, res) => {
    try {
        const { id } = req.query;
        const packagingType = await PackagingType.findById(id);
        if (!packagingType) {
            return res.status(404).json({ message: 'Packaging type not found' });
        }
        res.status(200).json(packagingType);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching packaging type', error });
    }
};

// Update a PackagingType by ID
exports.updatePackagingType = async (req, res) => {
    try {
        const { id } = req.query;
        const { title, alt, imgTitle } = req.body;
        let photo = req.body.photo;

        if (req.file) {
            photo = req.file.filename;
        }

        const updatedPackagingType = await PackagingType.findByIdAndUpdate(
            id,
            { title, photo, alt, imgTitle },
            { new: true, runValidators: true }
        );

        if (!updatedPackagingType) {
            return res.status(404).json({ message: 'Packaging type not found' });
        }

        res.status(200).json(updatedPackagingType);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error updating packaging type', error });
    }
};

// Delete a PackagingType by ID
exports.deletePackagingType = async (req, res) => {
    const { id } = req.query;
    try {
        const packagingType = await PackagingType.findById(id);

        // Remove associated photo file if it exists
        if (packagingType && packagingType.photo) {
            const filePath = path.join(__dirname, '../logos', packagingType.photo);
            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
            } else {
                console.warn(`File not found: ${packagingType.photo}`);
            }
        }

        const deletedPackagingType = await PackagingType.findByIdAndDelete(id);
        if (!deletedPackagingType) {
            return res.status(404).json({ message: 'Packaging type not found' });
        }

        res.status(200).json({ message: 'Packaging type deleted successfully' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error deleting packaging type', error });
    }
};
