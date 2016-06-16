'use strict';

var Promise = require('bluebird');
var request = Promise.promisifyAll(require('request'));
var _ = require('lodash');
var config = require('../../config');


_.templateSettings.interpolate = /{{([\s\S]+?)}}/g;

function symbolSearch(symbol) {
	var urlTemplate = _.template(config.api.symbolSearch);
	var url = urlTemplate({ mysym: symbol });
	return request.getAsync(url);
}

module.exports = symbolSearch;
