var app = angular.module('mealtrack', [
	'ionic',
	'ngMessages',
	'ngCordova',
	'angularMoment',
	'parse-angular',
	'parse-angular.enhance',
	'mealtrack.controllers.authentication',
	'mealtrack.controllers.meals',
	'mealtrack.controllers.account',
	'mealtrack.services.authentication',
	'mealtrack.services.meals',
	'mealtrack.filters.mealtime'
]);

app.run(function ($ionicPlatform,$ionicHistory,$rootScope) {
	$ionicPlatform.ready(function () {
		// Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
		// for form inputs)
		if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
			cordova.plugins.Keyboard.hideKeyboardAccessoryBar(false);
		}
		if (window.StatusBar) {
			// org.apache.cordova.statusbar required
			StatusBar.styleBlackTranslucent();
		}

		// For exit on back button press
       $ionicPlatform.registerBackButtonAction(function(e) {
         if ($rootScope.backButtonPressedOnceToExit) {
            navigator.app.exitApp(); // or // ionic.Platform.exitApp(); both work
         } else if ($ionicHistory.backView()) {
             $ionicHistory.goBack();
         } else {
            $rootScope.backButtonPressedOnceToExit = true;
            // "Press back button again to exit" : show toast                
            setTimeout(function() {
                $rootScope.backButtonPressedOnceToExit = false;
            }, 2000); // reset if user doesn't press back within 2 seconds, to fire exit
        }
        e.preventDefault();
        return false;
      }, 101);
     });
	});

		// Initialise Parse
		Parse.initialize("dJF0OmNaWpkQ5TCSFHDHqE6uL924X1Jut5kK57LR", "c1YNsKSv7u8NDKdDyCx0AN1T3888pGNhEmQqmu3e");
});

app.config(function ($stateProvider, $urlRouterProvider) {
	$stateProvider
		.state('login', {
			url: "/login",
			cache: false,
			controller: 'LoginCtrl',
			templateUrl: "templates/login.html"
		})
		.state('signup', {
			url: "/signup",
			cache: false,
			controller: 'SignupCtrl',
			templateUrl: "templates/signup.html"
		})
		.state('tab', {
			url: "/tab",
			abstract: true,
			templateUrl: "templates/tabs.html"
		})
		.state('tab.meals',{
			url: "/meals",
			views: {
				'tab-meals':{
					templateUrl: 'templates/tabs/tab-meals.html',
					controller: 'MealListCtrl'
				}
			}
		})
		.state('tab.track',{
			url: "/track",
			views: {
				'tab-track':{
					templateUrl: 'templates/tabs/tab-track.html',
					controller: 'MealCreateCtrl'
				}
			}
		})
		.state('tab.account',{
			url: "/account",
			views: {
				'tab-account':{
					templateUrl: 'templates/tabs/tab-account.html',
					controller: 'AccountCtrl'
				}
			}
		})
		//TODO
	;

	// if none of the above states are matched, use this as the fallback
	$urlRouterProvider.otherwise('/login');

});
