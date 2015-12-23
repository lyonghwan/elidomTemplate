'use strict';

/**
 * File Module
 */
angular.module('Elidom.File', ['Elidom.Core'])
    .run(function($rootScope, SettingService) {
        /**
         * 설정 화면 추가
         */
        SettingService.addSetting({
            sref : 'app.setting-file',
            image : 'images/tyrion.jpg',
            title : '파일 설정',
            description : '파일 설정',
            module : '파일',
            badgeType : 'badge-positive'
        });
    });