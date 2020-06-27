var express = require('express');
var router = express.Router();
var categouryModal = require('../modules/passCategory');
var passwordModal = require('../modules/passDetails');
var jwt = require('jsonwebtoken');
var categoryDetails = categouryModal.find({});


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
    categoryDetails.exec((err,data)=>{
      if(err) throw err;
      res.render('addPassword',{title:'add password',user:userIs,results:data,success:""})
    })
  })
  
  router.post('/',checkAuth,function(req,res,next){
    var userIs =localStorage.getItem("userNameIs");
    let categoryIs = req.body.passCategory;
    let passDetail = req.body.passDetails;
    let projectName = req.body.projectName;
    const addModal= new passwordModal({
      pass_category : categoryIs,
      pass_Details : passDetail,
      project_Name : projectName
    })
  
    categoryDetails.exec((err,data)=>{
      if(err) throw err;
      addModal.save((err)=>{
        if(err) throw err;
        res.render('addPassword',{title:'add password',user:userIs,success:"Data inserted Successfully....",results:data})
      })
    })
  })

module.exports = router;