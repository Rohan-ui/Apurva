const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productDetailSchema = new Schema({
    CASNo: { type: String },
    formula: { type: String },
    MW: { type: String },
    synonym: { type: String },
    EINECS: { type: String },
    density: { type: String },
    meltingPoint: { type: String },
    solubility: { type: String },
    appearance: { type: String },
    purity: { type: String },
    application: { type: String },
    packing: { type: String },
    insolubles: { type: String },
    productId: { type: String, ref: 'Product' }
}, {
    timestamps: true
});

const ProductDetail = mongoose.model('ProductDetail', productDetailSchema);

module.exports = ProductDetail;
