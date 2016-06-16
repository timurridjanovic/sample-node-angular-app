'use strict';

var gutil = require('gulp-util');
var webpack = require('webpack');
var config = require('../config.js');
var webpackConfig = config.webpackConfig;
var livereload = require('gulp-livereload');
var uncacheTask = require('../uncache/uncache-task.js');
var uncache = require('gulp-uncache');
var ngAnnotatePlugin = require('ng-annotate-webpack-plugin');
var argv = require('minimist')(process.argv.slice(2));
var DEBUG = !argv.release;

var setupWebpackConfig = function() {
	if (DEBUG) {
		webpackConfig.debug = true;
		webpackConfig.watchOptions = {};
		webpackConfig.watchOptions.aggregateTimeout = 200;
		webpackConfig.progress = true;
		webpackConfig.useMemoryFs = true;
	} else {
		webpackConfig.plugins.push(
				new webpack.optimize.UglifyJsPlugin(),
				new ngAnnotatePlugin({
					add: true
				})
		);
	}

	webpackConfig.devtool = '#source-map';
};


var webpackTask = function(watch, webpackStream, gulp) {
	if (watch) {
		webpackConfig.watch = true;
		webpackConfig.keepalive = true;
	}

	gulp.src(config.dev.jsEntry)
		.pipe(webpackStream(webpackConfig, null, function(err, stats) {
			if (err) throw new gutil.PluginError('webpack', err);
			gutil.log('[webpack]', stats.toString({
				colors: true
			}));
			uncacheTask(gulp);
		}))
		.pipe(gulp.dest(config.build.js))
		.pipe(livereload());
};

setupWebpackConfig();

module.exports = webpackTask;
