'use strict';

var Sequelize = require('sequelize');
var sequelize = require('../../db');

var StockModel = sequelize.define('stock', {
	symbol: { type: Sequelize.STRING, unique: true },
	companyName: Sequelize.STRING,
	lastTradePrice: Sequelize.FLOAT,
	numSharesOwned: Sequelize.INTEGER,
	stakeValue: Sequelize.FLOAT
});

function Stocks() {
	this.stocks = {};
}

Stocks.prototype.add = function(stock) {
	this.stocks[stock.symbol] = stock;
	return this.persistCreate(stock);
};

Stocks.prototype.update = function(stock) {
	this.stocks[stock.symbol] = stock;
	return this.persistUpdate(stock);
};

Stocks.prototype.find = function(symbol) {
	if (this.stocks[symbol]) {
		return sequelize.Promise.resolve(this.stocks[symbol]);
	}
	return this.fetch(symbol);
};

Stocks.prototype.findAll = function() {
	return this.fetch();
};

Stocks.prototype.delete = function(symbol) {
	delete this.stocks[symbol];
	return this.persistDelete(symbol);
};

Stocks.prototype.persistCreate = function(stock) {
	return sequelize.sync().then(function() {
		return StockModel.create(stock);
	});
};

Stocks.prototype.persistUpdate = function(stock) {
	return StockModel.update(stock, {
		where: {
			symbol: stock.symbol
		}
	});
};

Stocks.prototype.persistDelete = function(symbol) {
	return StockModel.destroy({
		where: {
			symbol: symbol
		}
	});
};

Stocks.prototype.fetch = function(symbol) {
	if (!symbol) {
		return StockModel.findAll();
	}
	return StockModel.findOne({symbol: symbol});
};

var stocks = new Stocks();

function Stock(stock) {
	this.symbol = stock.symbol;
	this.companyName = stock.companyName;
	this.lastTradePrice = parseFloat(stock.lastTradePrice);
	this.numSharesOwned = parseInt(stock.numSharesOwned);
	this.stakeValue = parseFloat(stock.stakeValue);
}

Stock.prototype.create = function() {
	return stocks.add(this);
};

Stock.update = function(stock) {
	return stocks.update(stock);
};

Stock.delete = function(symbol) {
	return stocks.delete(symbol);
};

Stock.find = function(symbol) {
	return stocks.find(symbol);
};

Stock.findAll = function() {
	return stocks.findAll();
};


module.exports = Stock;
