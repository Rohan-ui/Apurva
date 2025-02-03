const PackagingDetail = require('../model/packagingdetail');

// Get the packaging detail data
exports.getPackagingDetail = async (req, res) => {
    try {
        const packagingDetail = await PackagingDetail.findOne();
       
        res.json(packagingDetail);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


exports.updatePackagingDetail = async (req, res) => {
    const { heading, subheading, description } = req.body;

    try {
        let packagingDetail = await PackagingDetail.findOne();

        // If no packaging detail exists, create a new one
        if (!packagingDetail) {
            packagingDetail = new PackagingDetail({
                heading,
                subheading,
                description
            });

            const newPackagingDetail = await packagingDetail.save();
            return res.status(201).json(newPackagingDetail);
        }

        // Update the existing packaging detail
        packagingDetail.heading = heading;
        packagingDetail.subheading = subheading;
        packagingDetail.description = description;

        const updatedPackagingDetail = await packagingDetail.save();
        res.json(updatedPackagingDetail);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
