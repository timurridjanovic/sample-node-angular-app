'use strict';

var symbolSearchService = require('../../services/symbol-search');

var symbolSearchController = {
	get: function(req, res) {
		var symbol = req.params.id;
		symbolSearchService(symbol).then(function(result) {
			try {
				var body = JSON.parse(result.body);
				res.json(body.query.results);
			} catch(err) {
				console.log(err);
			}
		}).catch(function(err) {
			console.log(err);
		});
	}
};

module.exports = symbolSearchController;
