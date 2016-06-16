'use strict';

import _ from 'lodash';
import {getStakeValue} from '../../shared/utils';

var dependencies = ['$scope', 'symbolSearch', 'portfolio', '$interval'];
function controller($scope, symbolSearch, portfolio, $interval) {
	const MAX_STOCKS = 5;
	const savedStocksError = 'You already have 5 saved stocks. Remove one to save another.';
	const invalidStockError = 'The stock you are trying to save is invalid.';

	function parseChange(change) {
		return change.substring(0, 1) === '+';
	}

	function refreshStock(newStock, oldStock) {
		oldStock.companyName = newStock.Name || '';
		oldStock.symbol = newStock.Symbol || '';
		oldStock.lastTradePrice = newStock.LastTradePriceOnly || '';
		oldStock.change = parseChange(newStock.Change || '');
		oldStock.numSharesOwned = oldStock.numSharesOwned || 0;
		oldStock.stakeValue = getStakeValue(oldStock.lastTradePrice, oldStock.numSharesOwned);
		return oldStock;
	}

	function onSymbolChange(symbol) {
		if (symbol.length >= 3) {
			symbolSearch.get(symbol).then(function(result) {
				var stock = result.data.quote;
				refreshStock(stock, $scope.stock);
			});
		}
	}

	function isDuplicate(stock) {
		var duplicates = $scope.savedStocks.filter(s => s.companyName === stock.companyName);
		return duplicates.length > 0;
	}

	function isValidStock(stock) {
		if ($scope.savedStocks.length >= MAX_STOCKS && !isDuplicate(stock)) {
			return savedStocksError;
		}

		if (!stock.companyName) {
			return invalidStockError;
		}

		return '';
	}

	function saveStock(stock) {
		var error = isValidStock(stock);
		if (!error) {
			if (isDuplicate(stock)) {
				$scope.savedStocks = $scope.savedStocks.map(s => {
					if (s.symbol === stock.symbol) {
						return stock;
					}
					return s;
				});
				portfolio.update(stock);

			} else {
				$scope.savedStocks.push(_.cloneDeep(stock));
				portfolio.create(stock);
			}
			$scope.savedStocksError = '';
		} else {
			$scope.savedStocksError = error;
		}
	}

	function removeStock(stock) {
		$scope.savedStocks = $scope.savedStocks.filter(s => s.companyName !== stock.companyName);
		portfolio.delete(stock);
	}

	function refreshStocks() {
		var promises = $scope.savedStocks.map(function(stock) {
			return {
				stock: stock,
				promise: symbolSearch.get(stock.symbol)
			};
		});
		promises.forEach(function(obj) {
			obj.promise.then(function(result) {
				var stock = result.data.quote;
				refreshStock(stock, obj.stock);
			}).catch(function(err) {
				console.log(err);
			});
		});
	}

	function loadStocks() {
		portfolio.get().then(function(stocks) {
			$scope.savedStocks = stocks.data;
			refreshStocks();
		});
	}



	$scope.symbol = '';
	$scope.stock = {
		companyName: '',
		symbol: '',
		lastTradePrice: '',
		numSharesOwned: 0,
		stakeValue: 0
	};
	$scope.onSymbolChange = onSymbolChange;
	$scope.saveStock = saveStock;
	$scope.removeStock = removeStock;
	$scope.savedStocksError = '';
	$scope.savedStocks = [];
	loadStocks();

	$interval(function() {
		refreshStocks();
	}, 50000);
}

controller.$inject = dependencies;
export default controller;
