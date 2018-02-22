var sign = require('../modules/count');

exports.checkLogin = function (req, res){
	var username = req.body.username;
	var userpass = req.body.userpass;

	console.log("username:"+username);

	if ((username == "admin") && (userpass == "husky"))
	{
		console.log("req.session"+req.session);
		req.session.sign = true;
		sign.issign(1);
		console.log("req.session.sigh:"+req.session.sign);
		res.redirect('/manage');
	}
	else
	{
		req.session.sign = false;
		sign.issign(0);
		console.log("req.session.sigh:"+req.session.sign);
		res.render('login', {
		title: '登录',
		error: '密码错误！'		
		});
	}


}