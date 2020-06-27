const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/pms',{useUnifiedTopology:true,useCreateIndex:true});
const conn = mongoose.Collection;

const userSchema = new mongoose.Schema({
    name:{
        required:true,
        type:String,        
        // index:{
        //     unique:true
        // }
    },
    email:{
        required:true,
        type:String,       
        index:{
            unique:true
        }
    },
    password:{
        required:true,
        type:String,
    },
    date:{
        type:Date,
        default:Date.now
    }
})

const userModal = mongoose.model('users',userSchema);

module.exports=userModal;
