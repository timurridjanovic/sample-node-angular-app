'use strict';

var config = require('../config.js');
var uncache = require('gulp-uncache');
var injectLiveReload = require('gulp-inject-reload');
var gutil = require('gulp-util');
var argv = require('minimist')(process.argv.slice(2));
var DEBUG = !argv.release;

var uncacheTask = function(gulp) {
	gulp.src(config.templateSrc)
		.pipe(uncache())
		.pipe(DEBUG ? injectLiveReload() : gutil.noop())
		.pipe(gulp.dest(config.templateDest));
};

module.exports = uncacheTask;
