'use strict';

/**
 * @ngdoc function
 * @name core.controllers:PreferenceCtrl
 * @description
 * # Preference Controller
 */
angular.module('Elidom.Core')
	.controller('PreferenceCtrl', function($rootScope, $scope, $timeout, ionicMaterialInk, ionicMaterialMotion, AuthService, MenuService, ApiService, API_ENDPOINT, localStorageService) {

	    /**
	     * 사이드 메뉴 구성 
	     */
	    MenuService.setSideMenu('main');
	    
	});