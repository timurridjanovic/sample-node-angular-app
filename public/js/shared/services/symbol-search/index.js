'use strict';

import angular from 'angular';
import config from '../../config';


export default angular.module('services').service('symbolSearch', function($http) {
	this.get = function(symbol) {
		return $http.get(config.api.root + config.api.symbolSearch + symbol);
	};
});
