'use strict';

var apiRouter = require('./api');
var pagesRouter = require('./pages');

module.exports = {
	start: function(app) {
		apiRouter.init(app);
		pagesRouter.init(app);
	}
};
