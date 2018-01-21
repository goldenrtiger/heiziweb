var Tab = require('../models/tab');
var Pic = require('../models/pic'),
    fs = require('fs');
var promise = require('promise');
var URL = require('url');

function addlist (req, res, val){
	console.log("tab : addlist");
	var empty = 0;
	var title = req.body.addlisttitle;
	var content = req.body.editor1;
	var keyword = Math.random();
	console.log("keyword:"+keyword);
	if((title == "") || (content == "<p>请在这里输入列表内容</p>") || (keyword == "") || (val == ""))
	{
		res.send("请完整填写内容");
		return;
	}
	var date = getTimeNow();
	var like_num = 0;
	var look_num = 0;
	console.log("title:"+title+"keyword:"+keyword+"val:"+val);
	console.log("content:"+content);
	if ((title == ' ') && (content == ' ') && (keyword == ' '))//todo
	{
		empty = 1;
	}
	console.log("empty:"+empty);
	if ( (val.indexOf(".jpg") || val.indexOf(".png")) > 0 )
	{
		console.log("tab : addlist. this is pic.");
		if (empty == 1)
		{
			res.send("请填写增加内容");
		}
		else {
		console.log("update content:"+title+content+keyword);
		var promise = updatepiccontent(val, title, content, keyword,date, like_num,look_num);
		console.log("start to update content:");
		promise.then(function (result){
					res.send("添加成功");
				}).catch(function (err){
					console.log(err);
				});
		}
	}
	else
	{
		if (empty == 1)
		{
			if (req.body.addlistname == ' ')
			{
				empty = 2;
			}
		}
		if (empty == 2)
		{
			res.send("请填写增加内容");
		}
		else {
			var listmess = {
				tab_num: val,
				name: req.body.addlistname,  //列表标题
				title:title,  //列表title
				content: content,  //列表内容
				keyword: keyword, //列表关键字
				date: date, //发布日期
				like_num: 0,  //喜欢数量
				look_num: 0 //浏览次数
			};
			console.log("addlist:"+listmess.name);
			var tab = new Tab(listmess);
			console.log("new Tab");
			tab.save(function (err, data){
				if (err){
					res.send(err);
				}else{
					res.send("添加成功");
				}
			});
		}

	}

};

exports.getalllist = function(req,res){	
	var error = '';
	console.log("getalllist");
	var promise1 = findTablist('tab1');
	console.log("tab1");
	var promise2 = findTablist('tab2');
	console.log("tab2");
	var promise3 = findTablist('tab3');
	console.log("tab3");
	var promise4 = findTablist('tab4');
	console.log("tab4");
	var promise5 = findTablist('tab5');
	console.log("tab5");
	var promise6 = findTablist('tab6');
	console.log("tab6");
	var promise7 = findTablist('tab7');
	console.log("tab7");
	var promise8 = findPiclist('pic');
	console.log("pic");

	Promise.all([promise1, promise2, promise3, promise4, promise5, promise6, promise7, promise8]).then(function (result){
					res.render('index', {
						tab1list: result[0],
						tab2list: result[1],
						tab3list: result[2],
						tab4list: result[3],
						tab5list: result[4],
						tab6list: result[5],
						tab7list: result[6],
						pictab:result[7],
						error: error,
					});	
				}).catch(function (err){
					console.log(err);
				});
}

exports.getmanagelist = function(req,res){	
	var error = '';
	console.log("getmanagelist");
	var promise1 = findTablist('tab1');
	console.log("tab1");
	var promise2 = findTablist('tab2');
	console.log("tab2");
	var promise3 = findTablist('tab3');
	console.log("tab3");
	var promise4 = findTablist('tab4');
	console.log("tab4");
	var promise5 = findTablist('tab5');
	console.log("tab5");
	var promise6 = findTablist('tab6');
	console.log("tab6");
	var promise7 = findTablist('tab7');
	console.log("tab7");

	Promise.all([promise1, promise2, promise3, promise4, promise5, promise6, promise7]).then(function (result){
					res.render('manage', {
						tab1list: result[0],
						tab2list: result[1],
						tab3list: result[2],
						tab4list: result[3],
						tab5list: result[4],
						tab6list: result[5],
						tab7list: result[6],
						error: error,
					});	
				}).catch(function (err){
					console.log(err);
				});
}


exports.getmanage1list = function(req,res){	
	if (req.session.sign == false)
	{		
		console.log("getmanage1list");
		res.redirect('/login');
	}
	else
	{
		var error = '';
		console.log("getmanagelist");
		var promise1 = findTablist('tab1');
		var promise2 = findTablist('tab2');
		var promise3 = findTablist('tab3');
		var promise4 = findTablist('tab4');
		var promise5 = findTablist('tab5');
		var promise6 = findTablist('tab6');
		var promise7 = findTablist('tab7');
		var promise8 = findPiclist('pic');

		Promise.all([promise1, promise2, promise3, promise4, promise5, promise6, promise7, promise8]).then(function (result){
						// console.log("tab3:"+result[2]);
						res.render('manage', {
							tab1list: result[0],
							tab2list: result[1],
							tab3list: result[2],
							tab4list: result[3],
							tab5list: result[4],
							tab6list: result[5],
							tab7list: result[6],
							pictab: result[7],
							error: error,
						});	
					}).catch(function (err){
						console.log(err);
					});
	}
	
}

exports.edit_content = function(req, res){

	if (req.session.sign == false)
	{		
		console.log("getmanage1list");
		res.redirect('/login');
	}
	else
	{
		var keyword = req.query.keyword;	
		var type = req.query.pic;
		console.log("edit type:"+type);
		if (type == "0")
		{
			var promise = findPiclist('pic');
			Tab.findOne({keyword: keyword}, function (err, list){
				if (list == null){
					error = '该文章不存在！';
					res.render({
						error: error
					});
				}else{//todo
					console.log("edit list:"+list);
					promise.then(function (result){
						console.log("edit promise:"+result.length);
						res.render('editcontent', {
							tab1:1,
						    tab: list,
							pictab:result,
						    error:'',
						});	
					}).catch(function (err){
						console.log(err);
					});
				}		
			});
		}
		else if (type == "1")
		{
			var promise = findPiclist('pic');
			Pic.findOne({keyword: keyword}, function (err, list){
				if (list == null){
					error = '该文章不存在！';
					res.render({
						error: error
					});
				}else{//todo
					console.log("edit list:"+list);
					promise.then(function (result){
						console.log("edit promise:"+result.length);
						res.render('editcontent', {
							tab1:2,
						    tab: list,
							pictab:result,
						    error:'',
						});	
					}).catch(function (err){
						console.log(err);
					});
				}		
			});
		}

	}
	
}

exports.delete_content = function(req,res){
	var keyword = req.query.keyword;	
	var error;
	if (keyword != null)
	{
		Tab.remove({keyword:keyword}, function(err,data){
			error |= err;
			if(error) {
				res.send(error);
				return;
			}
			else
			{
				res.send("删除成功！");
			}
		});		
	}
}
//直接写文章
exports.write_content = function(req, res){

	if (req.session.sign == false)
	{		
		console.log("write_content");
		res.redirect('/login');
	}
	else
	{
		var promise = findPiclist('pic');
		var tabmess = {
			name:"请在这里输入列表名称",
			title:"请在这里输入列表title",  //列表title
			content: "请在这里输入列表内容",  //列表内容
			keyword: "请在这里输入列表关键字", //列表关键字
		};

		promise.then(function (result){
			console.log("edit promise:"+result.length);
			res.render('editcontent', {
			    tab:tabmess,
			    tab1:0,
				pictab:result,
			    error:'',
			});	
		}).catch(function (err){
			console.log(err);
		});

	}
	
}

//编辑后发表
exports.addcontent = function(req, res){
	var val_addc, val_printc, val;
	val_addc = req.body.btn_addc;
	val_printc = req.body.btn_printc;
	console.log("btn_addc:"+val_addc+"btn_printc:"+val_printc+"val_kw:"+val_kw);
	console.log("btn_addc type:"+typeof val_addc+"btn_printc type:"+typeof val_printc);
	if (typeof val_addc != "undefined")
	{
		console.log("btn_addc");
		var val_kw = val_addc.split("kw=")[1];
		console.log("val_kw:"+val_kw);
		if (val_addc.indexOf("id=0") > 0)//write
		{
			val = req.body.addtabsel;
			addlist(req, res, val);
		}
		else if (val_addc.indexOf("id=1") > 0)//edit
		{
			Tab.findOne({keyword: val_kw}, function (err, list){
				if (list == null){
					error = '该文章不存在！';
					res.render({
						error: error
					});
				}else{//todo
					console.log("edit list:"+list);
					var name = req.body.addlistname;
					var title = req.body.addlisttitle;
					var content = req.body.editor1;
					var keyword = req.body.addlistkeyword;
					var date = getTimeNow();
					console.log("title:"+title+"content:"+content+"keyword:"+keyword+"name:"+name);

					var promise = updatetabcontent(val_kw,name,title,content,keyword,date,0,0,list.tab_num);
					console.log("start to update content:");
					promise.then(function (result){
								res.send("添加成功");
							}).catch(function (err){
								console.log(err);
							});
				}		
			});
		}
		else if (val_addc.indexOf("id=2") > 0)//edit
		{
			Pic.findOne({keyword: val_kw}, function (err, list){
				if (list == null){
					error = '该文章不存在！';
					res.render({
						error: error
					});
				}else{//todo
					console.log("edit list:"+list);
					var name = req.body.addlistname;
					var title = req.body.addlisttitle;
					var content = req.body.editor1;
					var keyword = req.body.addlistkeyword;
					var date = getTimeNow();
					console.log("title:"+title+"content:"+content+"keyword:"+keyword+"name:"+name);

					var promise = updatepiccontent(name,title,content,keyword,date,0,0);
					console.log("start to update content:");
					promise.then(function (result){
								res.send("添加成功");
							}).catch(function (err){
								console.log(err);
							});
				}		
			});
		}
	}
	else if (val_printc == "print")
	{
		var title = req.body.addlisttitle;
		var content = req.body.editor1;
		var keyword = req.body.addlistkeyword;
		console.log("title:"+title);
		res.render('listdetail',{
		    title: title,
		    content: content,
		    date:0,
		    error:'',
		    look_num: 0,
		});
	}	
	console.log("no btn_addc no print");
}


exports.delkw = function(req, res){
	var error;
	// var keyword = req.body.keyword;
	var picitemname = req.body.picitemname;
	var path = 'public/img/';
	console.log("delkw:picitemkeyname："+picitemname);
	console.log("picitemname:"+typeof picitemname);
	if (typeof picitemname == "string")
	{				
		fs.exists(path+picitemname, function(exists){
					if (exists) 
					{
						console.log("fs.unlinkSync"+path+picitemname);
						fs.unlinkSync(path+picitemname);					
					}
				});

		Pic.remove({name:picitemname}, function(err,data){
			error = err;
		});	

	}
	else if (picitemname != null)
	{
		for(var i in picitemname){
			(function(i){
				console.log("picitemname+i:"+picitemname[i]);
				fs.exists(path+picitemname[i], function(exists){
					if (exists) 
					{
						console.log("fs.unlinkSync"+path+picitemname[i]);
						fs.unlinkSync(path+picitemname[i]);					
					}
				});
			})(i);
		}

		Pic.remove({name:{$in:picitemname}}, function(err,data){
			error = err;
		});		
	} 
	// if (keyword != null)
	// {
	// 	Tab.remove({keyword:{$in:keyword}}, function(err,data){
	// 		error |= err;
	// 		if(error) {
	// 			res.send(error);
	// 			return;
	// 		}
	// 	});		
	// }else if ((keyword == null) && (picitemname == null))
	// {		
	// 	res.send('请选择要删除的内容');
	// }

	res.send('删除成功');


}

//获得某条list的信息，并更新浏览次数
exports.getpiccontent = function (req, res){
	var picname = req.body.submit;
	var error = '';
	console.log("pic name:"+picname);	
	Pic.findOne({name: picname}, function (err, list){
		if (list == null){
			error = '该文章不存在！';
			res.send(error);
			// res.render({
			// 	error: error
			// });
		}else{
			//更新文章阅读次数
			var promise = picupdateLook_num(picname);
			promise.then(function (result){
				res.render('listdetail', {
				    title: list.title,
				    content: list.content,
				    date:list.date,
				    error:'',
				    look_num: list.look_num+1,
				});	
			}).catch(function (err){
				console.log(err);
			});

		}
		
	});
}
//获得某条list的信息，并更新浏览次数
exports.getlistcontent = function (req, res, tablistname){
	var val = tablistname;
	var error = '';
	Tab.findOne({name: val}, function (err, list){
		if (list == null){
			error = '该文章不存在！';
			res.render({
				error: error
			});
		}else{

			//更新文章阅读次数
			var promise = updateLook_num(val);
			promise.then(function (result){
				res.render('listdetail', {
				    title: list.title,
				    content: list.content,
				    date:list.date,
				    error:'',
				    look_num: list.look_num+1,
				});	
			}).catch(function (err){
				console.log(err);
			});

		}
		
	});
}

//更新喜欢的次数
exports.updateLike = function (req, res){
	var blogid = req.query.blogid;
	Blog.update({_id: blogid}, {$inc: {like_num: +1}}, function (err, blog){
		if (err){
			res.send('error');
		}else{
			//向用户的消息列表里存入未查看消息
			Blog.findOne({_id: blogid}, function (err, blog){
				message.saveMessage(blog, '', '', 1, req.session.user)
				.then(function (ok){
					res.send('ok');
				}).catch(function (err){
					res.send('error');
				});
			});
		}
	});	
};

function findpicname(keyword){
	return new Promise(function(resolve, reject){
		Pic.findOne({keyword:keyword},function(err, doc){
			if (err) {
				reject('error');
			}else{
				resolve(doc);
			}
		});
	});
}

function updatepiccontent(name, title, content, keyword,date, like_num,look_num){
	return new Promise(function (resolve, reject){
		Pic.update({name: name}, {title:title, content:content,keyword:keyword,date:date,like_num:like_num,look_num:look_num}, function (err, doc){
			if (err){
				reject('error');
			}else{
				resolve('ok');
			}
		});
	});
}

function updatetabcontent(keyword, name, title, content, keyword,date, like_num,look_num,tabnum){
	return new Promise(function (resolve, reject){
		Tab.update({keyword: keyword}, {name:name,title:title, content:content,keyword:keyword,date:date,like_num:like_num,look_num:look_num,tab_num:tabnum}, function (err, doc){
			if (err){
				reject('error');
			}else{
				resolve('ok');
			}
		});
	});
}

function updateLook_num(val){
	return new Promise(function (resolve, reject){
		Tab.update({name:val}, {$inc: {look_num: +1}}, function (err, doc){
			if (err){
				reject('error');
			}else{
				resolve('ok');
			}
		});
	});
}

function picupdateLook_num(name){
	return new Promise(function (resolve, reject){
		Pic.update({name:name}, {$inc: {look_num: +1}}, function (err, doc){
			if (err){
				reject('error');
			}else{
				resolve('ok');
			}
		});
	});
}

function findTablist(tabid){
	return new Promise(function (resolve, reject){
		Tab.find({tab_num: tabid}, function (err, doc){
			if (err){
				reject('error');
			}else if (doc){
				resolve(doc);
			}else{
				resolve(null);				
			}
		});
	});
}

function findPiclist(pictype){
	return new Promise(function (resolve, reject){
		Pic.find({type: pictype}, function (err, doc){
			if (err){
				reject('error');
			}else if (doc){
				resolve(doc);
			}else{
				resolve(null);				
			}
		});
	});
}

// function findReview(blogid){
// 	return new Promise(function (resolve, reject){
// 		Review.findOne({blogid: blogid}, function (err, reviews){
// 			if (err){
// 				reject('error');
// 			}else if (reviews){
// 				resolve(reviews.reviewlist);
// 			}else{
// 				resolve(null);
// 			}
// 		});
// 	});
// }

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