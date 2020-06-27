var express = require('express');
var router = express.Router();
var categouryModal = require('../modules/passCategory');
var jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');

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
    res.render('addCategory',{title:'add category',errors:'',success:'',user:userIs})
  })
  
  router.post('/',checkAuth,[
    check('passCategory','Enter password category...').isLength({ min: 1 })
  ],function(req,res,next){
    var userIs =localStorage.getItem("userNameIs");
    const errors = validationResult(req);
    if(!errors.isEmpty()){
    res.render('addCategory',{title:'add category',errors:errors.mapped(),success:'',user:userIs})
    }else{
      let pascate = req.body.passCategory;
      const categoryData = new categouryModal({
        pass_category : pascate
      })
      categoryData.save((err,data)=>{
         if(err) throw  err;
         res.render('addCategory',{title:'add category' ,errors:'', success:"Data Inserted successfully..",user:userIs})
      })
    }
  })

module.exports = router;