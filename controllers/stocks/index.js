'use strict';

var Stock = require('../../models/stock');

function create(req, res) {
	var stockParams = req.body.params.stock;
	var stock = new Stock(stockParams);

	return stock.create().then(function(result) {
		res.json(result);
	}).catch(function(error) {
		console.log(error);
	});
}

function update(req, res) {
	var stockParams = req.body.params.stock;
	return Stock.update(stockParams).then(function(result) {
		res.json(result);
	}).catch(function(error) {
		console.log(error);
	});
}


function remove(req, res) {
	var symbol = req.params.id;
	return Stock.delete(symbol).then(function(num) {
		res.json(num);
	}).catch(function(error) {
		console.log(error);
	});
}

function get(req, res) {
	Stock.findAll().then(function(data) {
		res.json(data.map(function(e) {
			return e.dataValues;
		}));
	}).catch(function(error) {
		console.log(error);
	});
}

module.exports = {
	create: create,
	remove: remove,
	get: get,
	update: update
};
