const mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');

mongoose.connect('mongodb://localhost:27017/pms',{useUnifiedTopology:true,useCreateIndex:true});
const conn = mongoose.Collection;

const passDetalsSchema = new mongoose.Schema({
    pass_category:{
        required:true,
        type:String,        
        // index:{
        //     unique:true
        // }
    },
    project_Name:{
        required:true,
        type:String,        
    },
    pass_Details:{
        required: true,
        type : String
    },
    date:{
        type:Date,
        default:Date.now
    }
})

passDetalsSchema.plugin(mongoosePaginate);

const cateModal = mongoose.model('passDetails',passDetalsSchema);

module.exports=cateModal;
