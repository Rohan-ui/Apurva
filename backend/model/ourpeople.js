const mongoose = require('mongoose');

const ourPeopleSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true,
    },
    photo: {
        type: String,
        required: true,
    },
    alt: {
        type: String,
        required: true,
    },
    imgTitle: {
        type: String,
        required: true,
    }
});

module.exports = mongoose.model('OurPeople', ourPeopleSchema);
