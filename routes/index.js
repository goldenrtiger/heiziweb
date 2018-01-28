var express = require('express');
var router = express.Router();
var counter = require('../modules/count');
var tab = require('./tab');
require('../modules/search');
var login = require('./login');
var pic = require('./pic');
var sear = require('./search');
var tmp_counter = 0;

router.get('/', tab.getalllist);
router.get('/index', tab.getalllist);
router.get('/search', sear.esearch);
router.get('/searchtab', tab.searchtab);


// router.get('/gettab1list',tab1.getalllist);

router.get('/login', function(req, res, next) {
  res.render('login', {
      title: '登录',
      error: ''
    });
});

router.get('/edit', tab.edit_content);
router.get('/delete', tab.delete_content);
router.get('/write_content', tab.write_content);
router.post('/addcontent', function(req, res, next){
  console.log("req.body.btn_addc:"+req.body.btn_addc);
  console.log("req.body.btn_printc:"+req.body.btn_printc);
  tab.addcontent(req,res);
});

router.post('/picclick', tab.getpiccontent);

router.get('/manage', tab.getmanagelist);

// router.post('/postaddlist', function(req, res, next){  
//   var val = req.body.addtabsel;
//   console.log("hello"+val);//todo
//   tab.addlist(req,res,val);
// }); 

router.post('/delkeyword', tab.delkw);

router.post('/dologin', login.checkLogin);

//增加内容
router.post('/tablistcontent', function(req,res,next){
  var tablistname = req.body.tablistname; 
  console.log("tablistname:"+tablistname);
  tab.getlistcontent(req,res,tablistname);

});

router.post('/manage1/pic', function(req,res,next){
  console.log("/manage1/pic");
  pic.manage1pic(req,res);

});

router.post('/manage/pic1',function(req,res,next){
  picname='pic1';
  console.log("/manage/pic:");
  pic.managepic(req,res,picname);
});

router.post('/manage/pic2',function(req,res,next){  
  picname='pic2';
  pic.managepic(req,res,picname);
});

router.post('/manage/pic3',function(req,res,next){  
  picname='pic3';
  pic.managepic(req,res,picname);
});

router.get('/search', function(req, res, next) {
  alert("search");
});

module.exports = router;
