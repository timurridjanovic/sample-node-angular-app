'use strict';

var path = require('path');
var dir = path.resolve(__dirname, '..');
var ngAnnotatePlugin = require('ng-annotate-webpack-plugin');

var config = {
	sass: path.join(dir, '/public/scss/**/*.scss'),
	webpack: path.join(dir, '/public/js/**/*.js'),
	webpackConfig: {
		entry: './public/js/main',
		output: {
			path: path.join(__dirname, '/build/js/'),
			filename: 'bundle.js',
			publicPath: '/js/'
		},
		storeStatsTo: 'bundle_hash',
		devtool: 'inline-source-map',
		module: {
			preLoaders: [
				{
					test: /\.jsx?$/, loader: 'eslint-loader', exclude: /node_modules/
				}
			],
			loaders: [
				{
					test: /\.jsx?$/,
					exclude: /node_modules/,
					loader: 'babel'
				},
				{
					test: /\.html$/,
					loader: 'ng-cache?prefix=[dir]/[dir]'
				}
			]
		},
		eslint: {
			configFile: './.eslintrc'
		},
		plugins: [
			new ngAnnotatePlugin({
				add: true
			})
		]
	},
	dev: {
		jsEntry: path.join(dir, '/public/js/main.js'),
		fonts: path.join(dir, '/public/fonts/**/*')
	},
	build: {
		css: path.join(dir, '/build/css/'),
		js: path.join(dir, '/build/js'),
		fonts: path.join(dir, '/build/css/fonts')
	},
	bundleName: 'bundle.js',
	templateSrc: path.join(dir, '/views/**/*.hbs'),
	templateDest: path.join(dir, '/build/views/'),
	templateLayoutSrc: path.join(dir, '/views/layout.hbs')
};

module.exports = config;

