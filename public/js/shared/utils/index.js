'use strict';

module.exports = {
	getStakeValue: function(lastTradePrice, numSharesOwned) {
		return parseFloat(lastTradePrice) * parseFloat(numSharesOwned) || 0;
	}
};
