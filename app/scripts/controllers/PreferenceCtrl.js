'use strict';

/**
 * @ngdoc function
 * @name ElidomTemplate.controllers:PreferenceCtrl
 * @description
 * # Preference Controller
 */
angular.module('ElidomTemplate')
	.controller('PreferenceCtrl', function($rootScope, $scope, $timeout, ionicMaterialInk, ionicMaterialMotion, AuthService, MenuService, ApiService, API_ENDPOINT, localStorageService) {

	    /**
	     * 사이드 메뉴 구성 
	     */
	    MenuService.setSideMenu('main');
	    /**
	     * Setting Items
	     */
	    $rootScope.settingItems = [ {
			sref : 'app.setting-basic',
			image : 'images/jon-snow.jpg',
			title : '기본 설정',
			description : 'App 기본 설정',
			module : '기본',
			badgeType : 'badge-assertive'
	    }, {
			sref : 'app.setting-printer',
			image : 'images/sansa.jpg',
			title : '프린터 설정',
			description : '프린터 설정',
			module : '프린터',
			badgeType : 'badge-calm'
	    }, {
			sref : 'app.setting-file',
			image : 'images/tyrion.jpg',
			title : '파일 설정',
			description : '파일 설정',
			module : '파일',
			badgeType : 'badge-positive'
	    } ];
	});