'use strict';

/**
 * Printer Module
 */
angular.module('Elidom.Printer', ['Elidom.Core'])
	.run(function($rootScope, SettingService) {
		/**
		 * 설정 화면 추가
		 */
		SettingService.addSetting({
			sref : 'app.setting-printer',
			image : 'images/sansa.jpg',
			title : '프린터 설정',
			description : '프린터 설정',
			module : '프린터',
			badgeType : 'badge-calm'
		});
	});