'use strict';
var config = require('../config');

module.exports = function(gulp) {
	gulp.task('assets-fonts', function(cb) {
		gulp.src(config.dev.fonts)
			.pipe(gulp.dest(config.build.fonts))
			.on('finish', function() {
				cb();
			});
	});
};
