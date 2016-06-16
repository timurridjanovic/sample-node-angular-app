'use strict';

var livereload = require('gulp-livereload');
var config = require('../config.js');
var webpackStream = require('webpack-stream');
var webpackTask = require('../webpack/webpack-task.js');

module.exports = function(gulp) {
	gulp.task('watch', function() {
		livereload.listen();
		gulp.watch(config.sass, ['sass']);
		gulp.watch(config.templateSrc, ['uncache']);
		webpackTask(true, webpackStream, gulp);
	});
};

