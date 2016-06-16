'use strict';

import angular from 'angular';
import config from '../../config';

export default angular.module('services').service('portfolio', function($http) {
	this.get = function() {
		return $http.get(config.api.root + config.api.portfolio);
	};

	this.getOne = function(stock) {
		return $http.get(config.api.root + config.api.portfolio + stock.symbol);
	};

	this.create = function(stock) {
		return $http.post(config.api.root + config.api.portfolio + stock.symbol, {
			params: { stock: stock }
		});
	};

	this.update = function(stock) {
		return $http.put(config.api.root + config.api.portfolio + stock.symbol, {
			params: { stock: stock }
		});
	};

	this.delete = function(stock) {
		return $http.delete(config.api.root + config.api.portfolio + stock.symbol);
	};
});
