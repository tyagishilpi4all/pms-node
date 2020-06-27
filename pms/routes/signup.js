var express = require('express');
var router = express.Router();
var userModal = require('../modules/user');
var bcryptjs = require('bcryptjs');

function checkEmail(req,res,next){
  let email = req.body.email;
  let emailExist = userModal.findOne({email:email});

  emailExist.exec((err,doc)=>{
    if(err) throw err;
    if(doc){
    return res.render('signup',{title:'Signup Form',msg:"email already exist"});
    }
    next();
  })
}

if(typeof localStorage === 'undefined' || localStorage === null){
  const LocalStorage = require('node-localstorage').LocalStorage;
  localStorage = new LocalStorage('./scratch')
}


router.get('/',function(req,res,next){
    res.render('signup',{title:'Signup Form',msg:''})
  })
  
  router.post('/',checkEmail,function(req,res,next){
    let uname = req.body.userName;
    let email = req.body.email;
    let pass = req.body.password;
    let confPass = req.body.cpassword;
    if(pass !== confPass){
      res.render('signup',{title:'Signup Form',msg:"Password not matched.."})
    }else{
      pass =bcryptjs.hashSync(pass,10)
    const userData = new userModal({
      name:uname,
      email :email,
      password:pass
    });
    userData.save((err,data)=>{
      if(err) throw err;
      res.render('signup',{title:'Signup Form',msg:"successfully done.."})
    })
  }
  })

module.exports = router;