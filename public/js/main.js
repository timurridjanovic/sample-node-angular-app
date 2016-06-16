'use strict';

import angular from 'angular';
import uiRouter from 'angular-ui-router';
import main from './modules/main';

angular.module('app', [
	'directives',
	'services',
	'main'
]);

angular.module('directives', []);
angular.module('services', []);

//Directives
var directives = require.context('./shared/directives', true, /^(?!.*test\.js).*\.js$/i);
directives.keys().forEach(directives);

//Services
var services = require.context('./shared/services', true, /^(?!.*test\.js).*\.js$/i);
services.keys().forEach(services);


angular.module('main', [uiRouter, 'services'])
	.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {

		$urlRouterProvider.otherwise('/');

		$stateProvider
			.state('page-one', {
				url: '/',
				views: {
					'application-main-content': {
						template: main.template,
						controller: main.controller
					}
				}
			});
	}]);
