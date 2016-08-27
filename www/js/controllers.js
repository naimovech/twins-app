angular
		.module('app.controllers', [])

		.controller('NavigationCtrl', function($scope, $ionicHistory) {
			"use strict";
			$scope.myGoBack = function() {
				$ionicHistory.goBack();
			};

		})

		.controller(
				'SERIESCtrl',
				function($scope, $cordovaNetwork, $rootScope, SeriesService,
						$timeout, $ionicLoading, $ionicModal,
						$ImageCacheFactory, BASEURL, chapitresAPI,
						subChapitresAPI) {
					"use strict";

					var chapitres = [];

					$scope.BASEURL = BASEURL;
					$scope.chapitresAPI = chapitresAPI;
					$scope.subChapitresAPI = subChapitresAPI;
					$scope.lang = $rootScope.lang;

					$scope.ChangeLanguage = function(lang) {
						window.localStorage.setItem("lang", lang);
						$scope.lang = lang;
						//console.log('default lang : ', $scope.lang);
					}

					if ($scope.isAndroid) {
						jQuery('#note-list-loading-progress').show();
					} else {
						jQuery('#note-list-loading-progress').fadeIn(700);
					}

					$timeout(function() {

						SeriesService.getChapitres().success(
								function(response, status, headers, config) {

									$scope.chapitres = response;

									var images = [];
									for (var i = 0; i < response.length; i++) {
										var url = chapitresAPI
												+ response[i].image;
										images.push(url);
									}

									$ImageCacheFactory.Cache(images);

									if ($scope.chapitres.length > 0) {
										window.localStorage.setItem(
												"chapitres", JSON
														.stringify(response));
									} else {
										$scope.chapitres = JSON
												.parse(window.localStorage
														.getItem("chapitres"));
									}
									jQuery('#note-list-loading-progress')
											.hide();
									jQuery('#note-list-content').fadeIn();

								}).error(
								function(response, status, headers, config) {
									// console.log("status:", status);
									$scope.chapitres = JSON
											.parse(window.localStorage
													.getItem("chapitres"));

								});

					}, 700);

					$scope.doRefresh = function() {

						$timeout(
								function() {

									SeriesService
											.getChapitres()
											.success(
													function(response, status,
															headers, config) {

														$scope.chapitres = response;

														if ($scope.chapitres.length > 0) {
															window.localStorage
																	.setItem(
																			"chapitres",
																			JSON
																					.stringify(response));
														} else {
															$scope.chapitres = JSON
																	.parse(window.localStorage
																			.getItem("chapitres"));
														}
														jQuery(
																'#note-list-loading-progress')
																.hide();
														jQuery(
																'#note-list-content')
																.fadeIn();

													})
											.error(
													function(response, status,
															headers, config) {
														$scope.chapitres = JSON
																.parse(window.localStorage
																		.getItem("chapitres"));

													});
								}, 700);
						$scope.$broadcast('scroll.refreshComplete');
						$scope.$apply();
					};

				})

		.controller(
				'episodesInSeriesCtrl',
				function($scope, $stateParams, $timeout, SeriesService,
						$ImageCacheFactory,BASEURL, chapitresAPI, subChapitresAPI) {
					"use strict";

					$scope.BASEURL = BASEURL;
					$scope.chapitresAPI = chapitresAPI;
					$scope.subChapitresAPI = subChapitresAPI;
					
					$scope.lang = window.localStorage.getItem("lang");

					if ($scope.isAndroid) {
						jQuery('#note-list-loading-progress').show();
					} else {
						jQuery('#note-list-loading-progress').fadeIn(700);
					}
					
					$scope.lang = window.localStorage.getItem("lang");;

					$timeout(function() {
						SeriesService.getSousChapitres($stateParams.id)
						
						.success(
								function(response, status, headers, config) {

									$scope.sousChapitres = response;

									var images = [];
									for (var i = 0; i < response.length; i++) {
										var url = subChapitresAPI
												+ response[i].image;
										images.push(url);
									}

									$ImageCacheFactory.Cache(images);

									if ($scope.sousChapitres.length > 0) {
										window.localStorage.setItem(
												"sousChapitres", JSON
														.stringify(response));
									} else {
										$scope.sousChapitres = JSON
												.parse(window.localStorage
														.getItem("sousChapitres"));
									}
									jQuery('#note-list-loading-progress')
											.hide();
									jQuery('#note-list-content').fadeIn();

								})
						
								.error(
										function(response, status,
												headers, config) {
											$scope.sousChapitres = JSON
													.parse(window.localStorage
															.getItem("sousChapitres"));
										});
					
					}, 700);

					$scope.doRefresh = function() {

						$timeout(function() {
							SeriesService.getSousChapitres($stateParams.id)
							
							.success(
									function(response, status, headers, config) {

										$scope.sousChapitres = response;

										var images = [];
										for (var i = 0; i < response.length; i++) {
											var url = subChapitresAPI
													+ response[i].image;
											images.push(url);
										}

										$ImageCacheFactory.Cache(images);

										if ($scope.sousChapitres.length > 0) {
											window.localStorage.setItem(
													"sousChapitres", JSON
															.stringify(response));
										} else {
											$scope.sousChapitres = JSON
													.parse(window.localStorage
															.getItem("sousChapitres"));
										}
										jQuery('#note-list-loading-progress')
												.hide();
										jQuery('#note-list-content').fadeIn();

									})
							
									.error(
											function(response, status,
													headers, config) {
												$scope.sousChapitres = JSON
														.parse(window.localStorage
																.getItem("sousChapitres"));
											});
						
						}, 700);						
						
						$scope.$broadcast('scroll.refreshComplete');
						$scope.$apply();
					};

				})

		.controller(
				'episodeDetailsCtrl',
				function($scope, $stateParams,$sce, $ionicSlideBoxDelegate,
						$timeout, $ionicModal, SeriesService, BASEURL, $ImageCacheFactory,
						chapitresAPI, subChapitresAPI, videoURL) {
					"use strict";

					$scope.BASEURL = BASEURL;
					$scope.chapitresAPI = chapitresAPI;
					$scope.subChapitresAPI = subChapitresAPI;
					$scope.videoURL = videoURL;
					$scope.videoLink = "";

					$scope.carosels = [];
					
					$scope.lang = window.localStorage.getItem("lang");
					
					//console.log('lang', $scope.lang);
					
					if ($scope.isAndroid) {
						jQuery('#note-list-loading-progress').show();
					} else {
						jQuery('#note-list-loading-progress').fadeIn(700);
					}

					$timeout(
							function() {
								SeriesService
										.getSousChapitresDetails(
												$stateParams.id)
										.then(
												function(sousChapitresDetails) {
													$scope.sousChapitresDetails = sousChapitresDetails.data;
													$scope.videoLink = $sce.trustAsResourceUrl($scope.videoURL + sousChapitresDetails.data[0].videoUrl);
													//console.log($scope.videoLink);
													jQuery(
															'#note-list-loading-progress')
															.hide();
													jQuery('#note-list-content')
															.fadeIn();

												});
							}, 1000);

					$scope.doRefresh = function() {

						$timeout(
								function() {
									SeriesService
											.getSousChapitresDetails(
													$stateParams.id)
											.then(
													function(
															sousChapitresDetails) {
														$scope.sousChapitresDetails = sousChapitresDetails.data;
													});
								}, 1000);
						$scope.$broadcast('scroll.refreshComplete');
						$scope.$apply();
					};
					$scope.nbrSlide = 0;
					
					var images = [];
					
					SeriesService
							.getGaleryBySousChapitre($stateParams.id)
							.then(
									function(res) {
										for (var i = 0; i < res.data.length; i++) {
											if (res.data[i].slider.length != '') {
												$scope.carosels
														.push({
															EPISODE_CAROSEL : subChapitresAPI + res.data[i].slider
														});
												
												images.push(subChapitresAPI + res.data[i].slider);
											}
										}
										//console.log($scope.carosels);
									});
					
					$ImageCacheFactory.Cache(images);
					
					//console.log("$scope.nbrSlide",$scope.nbrSlide);

					$scope.updateSlider = function() {
						$ionicSlideBoxDelegate.update(); // or just return
						// the function
					}

					$ionicModal.fromTemplateUrl('image-modal.html', {
						scope : $scope,
						animation : 'slide-in-up'
					}).then(function(modal) {
						$scope.modal = modal;
					});

					$scope.openModal = function() {
						$scope.modal.show();
						// Important: This line is needed to update the current
						// ion-slide's width
						// Try commenting this line, click the button and see
						// what happens
						$ionicSlideBoxDelegate.update();
					};

					$scope.closeModal = function() {
						$scope.modal.hide();
					};

					// Cleanup the modal when we're done with it!
					$scope.$on('$destroy', function() {
						$scope.modal.remove();
					});
					// Execute action on hide modal
					$scope.$on('modal.hide', function() {
						// Execute action
					});

					// Execute action on remove modal
					$scope.$on('modal.removed', function() {
						// Execute action
					});
					$scope.$on('modal.shown', function() {
						//console.log('Modal is shown!');
					});

					// Call this functions if you need to manually control the
					// slides
					$scope.next = function() {
						$ionicSlideBoxDelegate.next();
					};

					$scope.previous = function() {
						$ionicSlideBoxDelegate.previous();
					};
					
					$scope.slideHasChanged = function(index){
						//console.log("$scope.nbrSlide",$scope.carosels.length);
						//console.log('index', index);
					},

					// Called each time the slide changes
					$scope.slideChanged = function(index) {
						//console.log('index', index);
						$scope.slideIndex = index;
					};
				}) 

		.controller('LanguagesCtrl', function($scope, $rootScope) {
				
			$scope.data = { language : $scope.lang } ;
				
			$scope.serverSideChange = function(lang) {
				$scope.lang = lang;
				window.localStorage.setItem("lang", lang);
			};

		});
