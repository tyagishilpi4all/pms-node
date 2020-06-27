var express = require('express');
var router = express.Router();
var categouryModal = require('../modules/passCategory');
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
      res.render('ViewCategoryList',{title:'Category List',user:userIs , results:data})
    })
  })
  
  router.get('/delete/:id',checkAuth,function(req,res,next){
    var userIs =localStorage.getItem("userNameIs");
    var userId = req.params.id;
    var deleteContent = categouryModal.findByIdAndDelete(userId);
    
    deleteContent.exec(function(err){
      if(err) throw err;
      categoryDetails.exec((err,data)=>{
        if(err) throw err;
        res.render('ViewCategoryList',{title:'Category List',user:userIs , results:data});
      })
    })
  })
  
  router.get('/edit/:id',checkAuth,function(req,res,next){
    var userIs =localStorage.getItem("userNameIs");
    var userId = req.params.id;
    var editContent = categouryModal.findById(userId);
    
    editContent.exec(function(err,data){
      if(err) throw err;
      res.render('edit_category',{title:'Edit Category',errors:'',success:"",user:userIs , results:data});
    })
  })
  
  router.post('/update/',checkAuth,function(req,res,next){
    var userIs =localStorage.getItem("userNameIs");
    var userId = req.body.cate_id;
    var pasCat = req.body.passCategory;
    var updateContent = categouryModal.findByIdAndUpdate(userId,{
      pass_category :pasCat
    });
    
    updateContent.exec(function(err){
      if(err) throw err;
      categoryDetails.exec((err,doc)=>{
        if(err) throw err;
        res.render('ViewCategoryList',{title:'Category List',user:userIs , results:doc});
      })
    })
  })

module.exports = router;