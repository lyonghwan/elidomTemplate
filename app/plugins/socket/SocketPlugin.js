'use strict';

/**
 * Socket Module
 */
angular.module('Elidom.Socket', ['Elidom.Core'])
    .run(function($rootScope, SettingService) {
        /**
         * 설정 화면 추가
         */
        SettingService.addSetting({
            sref : 'app.setting-socket',
            image : 'images/tyrion.jpg',
            title : '소켓 설정',
            description : '소켓 설정',
            module : '소켓',
            badgeType : 'badge-assertive'
        });
    });