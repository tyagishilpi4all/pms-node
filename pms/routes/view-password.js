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
  var options = {
      offset:   1, 
      limit:    3
  };
  passwordModal.paginate({}, options).then(function(result) {
     console.log("shilpi hiiiii",result)
    //  if(err) throw err;
      res.render('viewPassword',{title:'view password',user:userIs ,
      results:result.docs,
      current : result.offset,
      pages : Math.ceil(result.total/result.limit)
    })
  });
  })
  
  router.get('/:page',checkAuth,function(req,res,next){
    var userIs =localStorage.getItem("userNameIs");
  var options = {
      offset:   1, 
      limit:    3
  };
  passwordModal.paginate({}, options).then(function(result) {
     console.log("shilpi hiiiii",result)
      res.render('viewPassword',{title:'view password',user:userIs ,
      results:result.docs,
      current : result.offset,
      pages : Math.ceil(result.total/result.limit)
    })
  });
  })
  
  router.get('/delete/:id',checkAuth,function(req,res,next){
    var userIs =localStorage.getItem("userNameIs");
    let user_id = req.params.id;
    var pass_content = passwordModal.findByIdAndDelete(user_id);
    pass_content.exec((err)=>{
      if(err) throw err;
      Password_DetailsIs.exec((err,data)=>{
        if(err) throw err;
        res.render('viewPassword',{title:'view password',user:userIs ,results:data})
      })
    })
  })
  
  router.get('/edit/:id',checkAuth,function(req,res,next){
    var userIs =localStorage.getItem("userNameIs");
    let user_id = req.params.id;
    var edit_content = passwordModal.findById(user_id);
    edit_content.exec((err,data)=>{
      if(err) throw err;
        res.render('editPassDetails',{title:'Edit password Details',user:userIs ,results:data , error:'' ,success:""})
    })
  })
  
  router.post('/update/',checkAuth,function(req,res,next){
    var userIs =localStorage.getItem("userNameIs");
    let user_id = req.body.pass_id;
    let passCate = req.body.passType;
    let project = req.body.passProject;
    let passDe = req.body.passDetails;
    var update_content = passwordModal.findByIdAndUpdate(user_id ,{
      pass_category : passCate,
      project_Name : project,
      pass_Details : passDe
    });
    update_content.exec((err)=>{
      if(err) throw err;
      Password_DetailsIs.exec((err,data)=>{
        if(err) throw err;
        res.render('viewPassword',{title:'view password',user:userIs ,results:data})
      })
    })
  })

module.exports = router;