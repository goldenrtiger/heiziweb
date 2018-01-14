var Schema = require('mongoose').Schema;

var tabSchema = new Schema({
		tab_num: String,
		name: String,  //列表标题
		title:String,  //列表title
		content: String,  //列表内容
		keyword: String, //列表关键字
		date: String, //发布日期
		like_num: Number,  //喜欢数量
		look_num: Number //浏览次数
	});

module.exports = tabSchema;