const mongoose = require('mongoose');

const chemicalFertilizersSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    icon: {
        type: String,
        required: true
    }
}, { timestamps: true });

const ChemicalFertilizers = mongoose.model('ChemicalFertilizers', chemicalFertilizersSchema);

module.exports = ChemicalFertilizers;