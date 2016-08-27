// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js

var db = null; //Use for SQLite database.
window.globalVariable = {
    //custom color style variable
    color: {
        appPrimaryColor: "",
        dropboxColor: "#017EE6",
        facebookColor: "#3C5C99",
        foursquareColor: "#F94777",
        googlePlusColor: "#D73D32",
        instagramColor: "#517FA4",
        wordpressColor: "#0087BE"
    },// End custom color style variable
    startPage: {
        url: "/series",//Url of start page.
        state: "churAPPiController.SERIES"//State name of start page.
    },
    message: {
        errorMessage: "Technical error please try again later." //Default error message.
    }
};// End Global variable



var app = angular.module('app', ['ionic','ionic.ion.imageCacheFactory','ionicLazyLoad','ngCordova','ngMaterial', 'app.controllers', 'app.routes', 'app.services', 'app.directives'])

app.constant('BASEURL', 'http://www.hotelolympicfes.com/ionic/');
app.constant('chapitresAPI', 'http://www.hotelolympicfes.com/ionic/chapitres/images/');
app.constant('subChapitresAPI', 'http://www.hotelolympicfes.com/ionic/sousChapitres/images/');
app.constant('videoURL', 'http://www.hotelolympicfes.com/ionic/sousChapitres/files/');

//app.constant('BASEURL', 'http://localhost/adminpanel/');
//app.constant('chapitresAPI', 'http://localhost/adminpanel/chapitres/images/');
//app.constant('subChapitresAPI', 'http://localhost/adminpanel/sousChapitres/images/');
//app.constant('videoURL', 'http://localhost/adminpanel/sousChapitres/files/');

app.config(function($httpProvider,$ionicConfigProvider) {
  $httpProvider.interceptors.push(function($rootScope) {
    return {
      request: function(config) {
        $rootScope.$broadcast('loading:show')
        return config
      },
      response: function(response) {
        $rootScope.$broadcast('loading:hide')
        return response
      }
    }
  });
  $ionicConfigProvider.backButton.previousTitleText(false).text(' ');
});


app.run(function($ionicPlatform,$rootScope, $ionicLoading,$cordovaSQLite, $cordovaNetwork) {
	"use strict";

  $ionicPlatform.ready(function() {
		    
		    if(window.cordova && window.cordova.plugins.Keyboard) {
		      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
		    }
		    if(window.StatusBar) {
		      // org.apache.cordova.statusbar required
		    if (ionic.Platform.isAndroid()) {
				StatusBar.backgroundColorByHexString("#E57373");
		    } else {
				StatusBar.styleLightContent();
		    }
			
		    }
			
			initialRootScope();
			
			document.addEventListener('deviceready', function() {
				
				initialSQLite();	
				
				console.log('$rootScope.lang : ', window.localStorage.getItem("lang"));
				
				$rootScope.lang = window.localStorage.getItem("lang");
				
				if($rootScope.lang == ''){
					window.localStorage.setItem("lang",'fr');
					$rootScope.lang = 'fr';
				}
				
			});
			
			console.log('$rootScope.lang : ', window.localStorage.getItem("lang"));
		
			$rootScope.lang = window.localStorage.getItem("lang");
			
			if($rootScope.lang == ''){
				window.localStorage.setItem("lang",'fr');
				$rootScope.lang = 'fr';
			}
			
	
  });
  
   function initialSQLite() {
            db = window.cordova ? $cordovaSQLite.openDB("twins.db") : window.sqlitePlugin.openDatabase({name:"twins.db", location:'default'});
			 console.info('database created or opned');
            $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS settings " +
                "( id           integer primary key   , " +
                "  defaultLanguage    text  , " +
                "  fontFamily         text  , " +
                "  primaryColor       text  ) ");
    };
  
   function initialRootScope() {
            // $rootScope.appPrimaryColor = appPrimaryColor;// Add value of appPrimaryColor to rootScope for use it to base color.
            $rootScope.isAndroid = ionic.Platform.isAndroid();// Check platform of running device is android or not.
            $rootScope.isIOS = ionic.Platform.isIOS();// Check platform of running device is ios or not.
        };
});

app.filter('trustAsResourceUrl', ['$sce', function($sce) {
	"use strict";
    return function(val) {
        return $sce.trustAsResourceUrl(val);
    };
}]);
