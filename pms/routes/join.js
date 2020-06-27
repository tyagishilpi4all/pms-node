var express = require('express');
var router = express.Router();
var passwordModal = require('../modules/passDetails');
var jwt = require('jsonwebtoken');
var Password_DetailsIs = passwordModal.find({})


function checkAuth(req,res,next){
      var userToken = localStorage.getItem('userToken')
      try {
        var decoded = jwt.verify(userToken,"loginToken");
      } catch(err) {
        res.render('index', { title: 'My Project' ,msg:''});
      }
      next();
}

if(typeof localStorage === 'undefined' || localStorage === null){
  const LocalStorage = require('node-localstorage').LocalStorage;
  localStorage = new LocalStorage('./scratch')
}


router.get('/',checkAuth,function(req,res,next){
    var userIs =localStorage.getItem("userNameIs");

  passwordModal.aggregate([
    {
      $lookup:
        {
          from: "passCategouries",
          localField: "pass_category",
          foreignField: "pass_category",
          as: "pass_cate"
        }
   }
 ]).exec((err,data)=>{
     if(err) throw err;
     console.log("shilpi ---->",data)
     res.send(data)
 });
  })
  
module.exports = router;