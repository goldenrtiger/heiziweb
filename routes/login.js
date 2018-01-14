

exports.checkLogin = function (req, res){
	var username = req.body.username;
	var userpass = req.body.userpass;

	console.log("username:"+username);

	if ((username == "admin") && (userpass == "husky"))
	{
		console.log("req.session"+req.session);
		req.session.sign = true;
		console.log("req.session.sigh:"+req.session.sign);
		res.redirect('/manage1');
	}
	else
	{
		req.session.sign = false;
		console.log("req.session.sigh:"+req.session.sign);
		res.render('login', {
		title: '登录',
		error: '密码错误！'		
		});
	}


}