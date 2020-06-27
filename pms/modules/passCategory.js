const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/pms',{useUnifiedTopology:true,useCreateIndex:true});
const conn = mongoose.Collection;

const passCategorySchema = new mongoose.Schema({
    pass_category:{
        required:true,
        type:String,        
        // index:{
        //     unique:true
        // }
    },
    date:{
        type:Date,
        default:Date.now
    }
})

const cateModal = mongoose.model('passCategouries',passCategorySchema);

module.exports=cateModal;
