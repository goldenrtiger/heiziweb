var Pic = require('../models/pic');
var promise = require('promise');
var formidable = require('formidable'),
    fs = require('fs');


exports.manage1pic=function(req, res){
  var form = new formidable.IncomingForm();
  form.encoding = 'utf-8';        //设置编辑
  form.uploadDir = 'public/img';     //设置上传目录
  form.keepExtensions = true;     //保留后缀
  form.maxFieldsSize = 2 * 1024 * 1024;   //文件大小
     
  console.log("manage1pic");
  form.parse(req,function(err,fields,files){
    if(err){      
      res.locals.error = err;
      res.send('file err');
      return;
    }
    console.log('files:'+files);
    console.log('picfile:'+files.picfile);
    console.log('type:'+files.picfile.type);
    var extName = '';
    switch (files.picfile.type) {
      case 'image/pjpeg':
        extName = 'jpg';
        break;
      case 'image/jpeg':
        extName = 'jpg';
        break;
      case 'image/png':
        extName = 'png';
        break;
      case 'image/x-png':
        extName = 'png';
        break;
    }
    if(extName.length == 0){
      res.locals.error = '只支持png和jpg格式图片';
      res.send('只支持png和jpg格式图片');
      return;
    }

    var tmp_title = req.body.pictitle;

    var picmess = {
    	type: 'pic',
    	name:files.picfile.name,    //图片名称
		title:null,  //列表title
		content: null,  //列表内容
		date:  null, //发布日期
		keyword: null,
		like_num: 0,  //喜欢数量
		look_num: 0 //浏览次数
    };

    var pic = new Pic(picmess);
	console.log("new pic："+picmess);
	pic.save(function (err, data){
		if (err){
			res.send(err);
		}else{
		    // res.send('上传成功！');
			// res.redirect('/manage');
		}
	}); 
	console.log("files.picfile.name:"+files.picfile.name);
    var filename = '/'+files.picfile.name;
    var newPath = form.uploadDir+filename;
    console.log("newPath:"+newPath);
    console.log("picfile path:"+files.picfile.path);    
    fs.renameSync(files.picfile.path, newPath);  //重命名
    res.send('上传成功！');

  });




}

exports.managepic=function(req, res, picname){
  var form = new formidable.IncomingForm();
  form.encoding = 'utf-8';        //设置编辑
  form.uploadDir = 'public/img';     //设置上传目录
  form.keepExtensions = true;     //保留后缀
  form.maxFieldsSize = 2 * 1024 * 1024;   //文件大小
  
	console.log("switch picname:");

    switch(picname)
    {
    	case 'pic1':
    		var tmp_title = req.body.pic1title;
    		var tmp_content = req.body.pic1content;
    		break;
    	case 'pic2':
    		var tmp_title = req.body.pic2title;
    		var tmp_content = req.body.pic2content;
    		break;
    	case 'pic3':
    		var tmp_title = req.body.pic3title;
    		var tmp_content = req.body.pic3content;
    		break;
    	default:
    		var tmp_title = '';
    		break;
    }
    if (tmp_title != '')
    {
    	var promise1 = checkPic(picname);
		Promise.all([promise1]).then(function (result){
			if (promise1 != null)
			{
				console.log("promise all");
			 //    Pic.remove({name:picname}, function(err,data){
				// 	if(err) {
			 //    		console.log("remove error");
				// 		res.send(err);//todo
				// 	}
				// }); 				
			}
		}).catch(function (err){
			console.log(err);
		});
		console.log("tmp_title:"+tmp_title+"tmp_content"+tmp_content);
	    var picmess = {
	    	name:picname,    //图片名称
			title:tmp_title,  //列表title
			content: tmp_content,  //列表内容
			date:  getTimeNow(), //发布日期
			like_num: 0,  //喜欢数量
			look_num: 0 //浏览次数
	    };

	    var pic = new Pic(picmess);
		console.log("new pic："+picmess);
		pic.save(function (err, data){
			if (err){
				res.send(err);
			}else{
			    // res.send('上传成功！');
				// res.redirect('/manage');
			}
		});

    }
    else
    {
		res.send('图片名错误！');
    }
  console.log("managepic");

  form.parse(req,function(err,fields,files){
    if(err){      
      res.locals.error = err;
      res.send('file err');
      return;
    }
    console.log(files);
    var extName = '';
    switch (files.pic1file.type) {
      case 'image/pjpeg':
        extName = 'jpg';
        break;
      case 'image/jpeg':
        extName = 'jpg';
        break;
      case 'image/png':
        extName = 'png';
        break;
      case 'image/x-png':
        extName = 'png';
        break;
    }
    if(extName.length == 0){
      res.locals.error = '只支持png和jpg格式图片';
      res.send('只支持png和jpg格式图片');
      // res.redirect('/manage');
      return;
    }

    var filename = '/'+picname+'.'+extName;
    var newPath = form.uploadDir+filename;
    console.log("newPath:"+newPath);
    console.log("pic1file path:"+files.pic1file.path);    
    fs.renameSync(files.pic1file.path, newPath);  //重命名

  });


}

function checkPic(picname){
	return new Promise(function (resolve, reject){
		Pic.findOne({name: picname}, function (err, doc){
			if (err){
				reject('error');
			}else{
				resolve(doc);
			}
		});
	});
}

//获得本地时间
function getTimeNow()
{
    var date = new Date();
    var seperator1 = "-";
    var seperator2 = ":";
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
	var hour = date.getHours();
	var minute = date.getMinutes();
	var second = date.getSeconds();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
	if (hour >= 0 && hour <= 9)
		hour = "0" + hour;
	if (minute >= 0 && minute <= 9)
		minute = "0" + minute;
	if (second >= 0 && second <= 9)
		second = "0" + second;
    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
            + " " + hour + seperator2 + minute
            + seperator2 + second;
    return currentdate;
}