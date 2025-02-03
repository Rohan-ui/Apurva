const mongoose = require('mongoose');

const packagingdetailSchema = new mongoose.Schema({
   
    heading: {
        type: String,
       
    },
    subheading: {
        type: String,
       
    },
    description:{
        type:String,
    }
 
});

module.exports = mongoose.model('Packgingdetail', packagingdetailSchema);
