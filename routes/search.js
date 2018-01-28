var elasticsearch = require('elasticsearch');

var client = new elasticsearch.Client({
	host:'localhost:9200',
	log:'trace'
});

exports.esearch = function(req, res) {
	var keyword = req.query.kw;
	console.log("search kw:"+keyword);
	client.search({
		index: 'mylist',
		type: 'Tab, Pic',
		q: keyword,
	}).then(function(resp){
		console.log("searchlist:"+resp.hits.hits.length);
		console.log("searchlist:"+resp.hits.hits[0]._source.title);
		res.render('searchlist', {
			tabsearch: resp.hits.hits,
			error: ''		
		});
	}, function(err) {
		console.trace(err.message);
	});
}