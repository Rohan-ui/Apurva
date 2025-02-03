const mongoose = require('mongoose');

const NewscategorySchema = new mongoose.Schema({
  category: { type: String, required: true, unique: true },
  // description: { type: String},
  photo: { type: String },
  alt: { type: String, default: '' },
  imgTitle: { type: String, default: '' },
});

module.exports = mongoose.model('NewsCategory', NewscategorySchema);
