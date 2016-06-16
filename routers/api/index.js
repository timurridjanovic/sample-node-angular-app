'use strict';

var express = require('express');
var apiRouter = express.Router();
var config = require('../../config');

var symbolSearchController = require('../../controllers/symbol-search');
var stocksController = require('../../controllers/stocks');

function initApiRouter(app) {
	app.use(config.api.root, apiRouter);
	apiRouter.route('/symbols/:id').get(symbolSearchController.get);
	apiRouter.route('/stocks').get(stocksController.get);
	apiRouter.route('/stocks/:id').post(stocksController.create).put(stocksController.update).delete(stocksController.remove);
}


module.exports = {
	init: initApiRouter
};
