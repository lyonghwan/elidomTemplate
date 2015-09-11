'use strict';

/**
 * @ngdoc overview
 * @name ElidomTemplate
 * @description
 * # Initializes main application and routing
 *
 * Main module of the application.
 */


angular.module('ElidomTemplate', ['ionic', 'ngCordova', 'ngResource','ionic-datepicker'])

  .run(function($ionicPlatform,$rootScope) {

    $ionicPlatform.ready(function() {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard for form inputs)
      if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      }
      // if (window.StatusBar) {
      //   // org.apache.cordova.statusbar required
      //   StatusBar.styleLightContent();
      // }
      // save to use plugins here
      var platform = ionic.Platform.platform();
      console.log(platform);

      if(platform=="android"){
        $rootScope.isDivicePlatform = true;
      }
    });

    // add possible global event handlers here

  })

  .config(function($httpProvider, $stateProvider, $urlRouterProvider) {
    // register $http interceptors, if any. e.g.
    // $httpProvider.interceptors.push('interceptor-name');

    // Application routing
    $stateProvider
      .state('app', {
        url: '/app',
        abstract: true,
        templateUrl: 'templates/main.html',
        controller: 'MainController'
      })
      .state('app.home', {
        url: '/home',
        cache: true,
        views: {
          'viewContent': {
            templateUrl: 'templates/views/home.html',
            controller: 'HomeController'
          }
        }
      })
      .state('app.settings', {
        url: '/settings',
        cache: true,
        views: {
          'viewContent': {
            templateUrl: 'templates/views/settings.html',
            controller: 'SettingsController'
          }
        }
      })

 // setup an abstract state for the tabs directive
  //   .state('tab', {
  //   url: '/tab',
  //   abstract: true,
  //   templateUrl: 'templates/tabs.html'
  // })

  // Each tab has its own nav history stack:

  .state('tab.dash', {
    url: '/dash',
    views: {
      'tab-dash': {
        templateUrl: 'templates/views/tab-dash.html',
        controller: 'DashCtrl'
      }
    }
  })

 //  .state('tab.chats', {
 //      url: '/chats',
 //      views: {
 //        'tab-chats': {
 //          templateUrl: 'templates/tab-chats.html',
 //          controller: 'ChatsCtrl'
 //        }
 //      }
 //    })
 //    .state('tab.chat-detail', {
 //      url: '/chats/:chatId',
 //      views: {
 //        'tab-chats': {
 //          templateUrl: 'templates/chat-detail.html',
 //          controller: 'ChatDetailCtrl'
 //        }
 //      }
 //    })

 //  .state('tab.account', {
 //    url: '/account',
 //    views: {
 //      'tab-account': {
 //        templateUrl: 'templates/tab-account.html',
 //        controller: 'AccountCtrl'
 //      }
 //    }
 //  });
    // redirects to default route for undefined routes
    $urlRouterProvider.otherwise('/app/home');
  });


