'use strict';

/**
 * @ngdoc function
 * @name Elidom.Core.core.directves:elidomFooterBar
 * @description Footer Bar  
 */
angular.module('Elidom.Core')
	.directive('elidomFooterBar', function () {
		return { 
			restrict : 'E',
			replace : true,
			controller : 'elidomFooterBarCtrl',
			template : 
			'<ion-footer-bar>' +
				'<div class="tabs tabs-dark tabs-icon-top static">' +
					'<a class="tab-item active" ui-sref="app.home" ui-sref-active="active" ui-sref-opts="{reload : true}">' +
						'<i class="icon ion-home"></i>홈' +
					'</a>' +
					'<a class="tab-item active" ui-sref="app.print" ui-sref-active="active" ui-sref-opts="{reload : true}">' +
						'<i class="icon ion-printer"></i>프린트' + 
					'</a>' +
					'<a class="tab-item active" ui-sref="app.service" ui-sref-active="active" ui-sref-opts="{reload : true}">' +
						'<i class="icon ion-speakerphone"></i>서비스' +
					'</a>' +
					'<a class="tab-item active" ui-sref="app.profile" ui-sref-active="active" ui-sref-opts="{reload : true}">' +
						'<i class="icon ion-android-people"></i>프로필' + 
					'</a>' + 
					'<a class="tab-item active" ui-sref="app.preference" ui-sref-active="active" ui-sref-opts="{reload : true}">' +
						'<i class="icon ion-gear-b"></i>설정' + 
					'</a>' + 
				'</div>' + 
			'</ion-footer-bar>'
		};
	})
	.controller('elidomFooterBarCtrl', function($scope) {
	});