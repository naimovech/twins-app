angular.module('app.services', [])

.factory('consUrl', function(BASEURL) {
	return BASEURL + "includes/encode/index.php/?get=";
})

.factory('Promise', function($http, BASEURL) {
	return {
		resolve : function(data) {

			data.url = BASEURL + data.url

			if (!data.headers)
				data.headers = {}
			data.headers.Authorization = 'Basic ';
			var call = $http(data)
			return call;
		}
	}
})

.factory('StorageService', function($localStorage) {
	var _getAll = function() {
		return $localStorage.things;
	};
	var _add = function(thing) {
		$localStorage.things.push(thing);
	}
	var _remove = function(thing) {
		$localStorage.things.splice($localStorage.things.indexOf(thing), 1);
	}
	return {
		getAll : _getAll,
		add : _add,
		remove : _remove
	};
})

.factory(
		'SeriesService',
		function($http, $stateParams, consUrl, $ionicLoading) {
			"use strict";
			var get_url = consUrl;

			return {
				getChapitres : function() {
					var chapitres = [];

					return $http.get(get_url + "chapitres")
					.success(function (response, status, headers, config) {
						chapitres = response;
						$ionicLoading.hide();
						console.log("status:" , response.status );
						return chapitres;
					}).error(function (response, status, headers, config) {
						console.log("status:" , status );
						return null;
					})
					 ;
				},
				getSousChapitres : function(id) {
					var sousChapitres = [];
					id = $stateParams.id;
					return $http
							.get(get_url + "sousChapitres&chapitreId=" + id)
							.success(function (response, status, headers, config) {
								sousChapitres = response;
								$ionicLoading.hide();
								return sousChapitres;
							})
							.error(function (response, status, headers, config) {
								console.log("status:" , status );
								return null;
							})
							;

				},
				getSousChapitresDetails : function(id) {
					var sousChapitresDetails = [];
					id = $stateParams.id;
					return $http.get(
							get_url + "sousChapitresDetails&chapitreId=" + id)
							.then(function(response) {
								sousChapitresDetails = response;
								return sousChapitresDetails;
							});

				},
				getGaleryBySousChapitre : function(id) {
					var galleries = [];
					id = $stateParams.id;
					return $http.get(get_url + "galleries&chapitreId=" + id)
							.then(function(response) {
								galleries = response;
								return galleries;
							});

				},
			};
		})
;
