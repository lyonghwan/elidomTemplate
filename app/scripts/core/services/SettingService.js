'use strict';

/**
 * @ngdoc function
 * @name core.services:SettingService
 * @description 
 *  # 설정 관련 서비스
 */
angular.module('Elidom.Core')
  .factory('SettingService', function($rootScope) {

    return {
        /**
         * 설정 요소 최초 로딩
         */
        loadDefaultSettings : function() {
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
            } ];
        },

        /**
         * 설정 요소 추가 
         */
        addSetting : function(setting) {
            $rootScope.settingItems.push(setting);
        }

    };

});