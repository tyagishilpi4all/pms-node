var express = require('express');
var router = express.Router();
var userModal = require('../modules/user');
var bcryptjs = require('bcryptjs');
var jwt = require('jsonwebtoken');

if(typeof localStorage === 'undefined' || localStorage === null){
  const LocalStorage = require('node-localstorage').LocalStorage;
  localStorage = new LocalStorage('./scratch')
}

/* GET home page. */
router.get('/', function(req, res, next) {
  var userIs =localStorage.getItem("userNameIs");
  if(userIs !== ''){
    res.redirect('/dashboard')
  }else{
  res.render('index', { title: 'My Project' ,msg:''});
  }
  next();
});

router.post('/', function(req, res, next) {
  let email = req.body.email;
  let pass = req.body.password;
  let checkUser = userModal.findOne({email:email});
  checkUser.exec((err ,doc)=>{
    if(err) throw err;
    let passAvail = doc.password; 
    let getUserId = doc._id;
    let getUserName = doc.name;   
    if(bcryptjs.compareSync(pass,passAvail)){
      var token = jwt.sign({ userId: getUserId }, 'loginToken');
      localStorage.setItem('userToken', token);
      localStorage.setItem('userNameIs', getUserName)
      res.redirect('/dashboard');
    }else{
      res.render('index', { title: 'My Project' ,msg:'username or password not matched...'});
    }
  })
});


router.get('/logout',function(req,res,next){
  localStorage.removeItem("userToken");
  localStorage.removeItem("userNameIs");
  res.render('index', { title: 'My Project' ,msg:''});
  next();
})

module.exports = router;
