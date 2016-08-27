angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

	// Ionic uses AngularUI Router which uses the concept of states
	// Learn more here: https://github.com/angular-ui/ui-router
	// Set up the various states which the app can be in.
	// Each state's controller can be found in controllers.js
	$stateProvider.state('churAPPiController.SERIES', {
		url : '/series',
		views : {
			'tab1' : {
				templateUrl : 'templates/SERIES.html',
				controller : 'SERIESCtrl'
			}
		}
	})
	
	.state('churAPPiController.HOME', {
		url : '/home',
		views : {
			'tab1' : {
				templateUrl : 'templates/SERIES.html',
				controller : 'SERIESCtrl'
			}
		}
	})

	.state('churAPPiController.LANGUAGES', {
		url : '/languages',
		views : {
			'tab2' : {
				templateUrl : 'templates/LANGUAGES.html',
				controller : 'LanguagesCtrl'
			}
		}
	})

	.state('churAPPiController', {
		url : '/controllerAPPi',
		templateUrl : 'templates/churAPPiController.html',
		abstract : true
	})

	.state('churAPPiController.episodesInSeries', {
		url : '/episodes/:id',
		views : {
			'tab1' : {
				templateUrl : 'templates/episodesInSeries.html',
				controller : 'episodesInSeriesCtrl'
			}
		}
	})

	.state('churAPPiController.episodeDetails', {
		url : '/episode-details/:id',
		views : {
			'tab1' : {
				templateUrl : 'templates/episodeDetails.html',
				controller : 'episodeDetailsCtrl'
			}
		}
	});

	$urlRouterProvider.otherwise('/controllerAPPi/series');

});