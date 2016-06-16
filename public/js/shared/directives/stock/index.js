'use strict';

import angular from 'angular';
import template from './template.html';
import {getStakeValue} from '../../utils';


var dependencies = ['$scope'];
function StockController() {
	var vm = this;

	function numSharesChanged(numShares) {
		vm.stock.stakeValue = getStakeValue(vm.stock.lastTradePrice, numShares);
	}

	vm.numSharesChanged = numSharesChanged;
}

function stockDirective() {
	return {
		restrict: 'E',
		template: template,
		scope: {
			stock: '=data',
			editable: '@'
		},
		controller: StockController,
		controllerAs: 'vm',
		bindToController: true
	};
}

StockController.$inject = dependencies;
export default angular.module('directives').directive('stock', stockDirective);
