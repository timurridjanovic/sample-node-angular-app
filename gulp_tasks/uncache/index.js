'use strict';

var uncacheTask = require('./uncache-task.js');

module.exports = function(gulp) {
	gulp.task('uncache', ['webpack'], function() {
		uncacheTask(gulp);
	});
};
