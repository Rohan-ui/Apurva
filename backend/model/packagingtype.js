const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PackagingTypeSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  photo: {
    type: String
  },
  alt: {
    type: String
  },
  imgTitle: {
    type: String
  },

}, {
  timestamps: true
});

module.exports = mongoose.model('PackagingType', PackagingTypeSchema);
