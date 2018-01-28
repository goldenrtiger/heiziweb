var elasticsearch = require('elasticsearch');

var client = new elasticsearch.Client({
	host:'localhost:9200',
	log:'trace'
});

client.ping({
	requestTimeout:30000
}, function(error){
	if (error) {
		console.trace('Error', error);
	} else {
		console.log('Connected');
	}
	// client.close();
});

// //查询数据
// client.search({
// 	index: 'mylist',
// 	type: 'test',
// 	body: {
// 		query:{
// 			match:{
// 				body:'我'
// 			}
// 		}
// 	}
// }, function(error, response){
// 	if (error) {
// 		console.trace('Error::', error);
// 	}
// 	else {
// 		console.log('search');
// 	}
// 	console.log('response:'+response);
// });

client.search({
	index: 'mylist',
	type: 'Tab',
	q:'content:我',
}).then(function(resp){
	console.log(resp.hits.hits[1]._source);
}, function(err) {
	console.trace(err.message);
});

