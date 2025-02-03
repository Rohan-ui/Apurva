const OurPeople = require("../model/ourpeople")

exports.getOurPeople = async (req, res) => {
    try {
        const footer = await OurPeople.findOne();
        if (!footer) {
            return res.status(404).json({ message: 'Footer not found' });
        }
        res.json(footer);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


exports.updateOurPeople = async (req, res) => {
    try {
        const { description, imgTitle, alt } = req.body;
        let photo = req.body.photo;

       
        if (req.file) {
            photo = req.file.filename;
        }

        // Find and update the document, or create a new one if it doesn't exist
        const updatedOurPeople = await OurPeople.findOneAndUpdate(
            {},
            { description, alt, imgTitle, photo },
            { new: true, runValidators: true, upsert: true } // upsert will create if not found
        );

        res.status(200).json(updatedOurPeople);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error updating or creating OurPeople', error });
    }
};

