'use strict';

/**
 * @ngdoc function
 * @name Elidom.Core.core.directves:elidomMenuBar
 * @description 메뉴 바   
 */
angular.module('Elidom.Core')
    .directive('elidomMenuBar', function () {
        return { 
            restrict : 'E',
            replace : true,
            controller : 'elidomMenuBar',
            template : 
            '<ion-list>' + 
                '<ion-item nav-clear menu-close ui-sref="app.home">' + 
                    '<i class="icon ion-home"></i> 홈' + 
                '</ion-item>' + 
                '<ion-item nav-clear menu-close ui-sref="app.rest">' + 
                    '<i class="icon ion-ios-briefcase"></i> REST 서비스' + 
                '</ion-item>' +                 
                '<ion-item nav-clear menu-close ui-sref="app.dynamic-logic">' + 
                    '<i class="icon ion-lock-combination"></i> Dynamic Logic' + 
                '</ion-item>' +                 
                '<ion-item nav-clear menu-close ui-sref="app.channel">' + 
                    '<i class="icon ion-social-rss"></i> 채널 관리' + 
                '</ion-item>' +                 
                '<ion-item nav-clear menu-close ui-sref="app.print">' + 
                    '<i class="icon ion-printer"></i> 프린트' + 
                '</ion-item>' + 
                '<ion-item nav-clear menu-close ui-sref="app.dataludi">' + 
                    '<i class="icon ion-grid"></i> 그리드' + 
                '</ion-item>' + 
                '<ion-item nav-clear menu-close ui-sref="app.notice">' + 
                    '<i class="icon ion-email-unread"></i> 공지사항' + 
                '</ion-item>' + 
                '<ion-item nav-clear menu-close ui-sref="app.profile">' + 
                    '<i class="icon ion-android-people"></i> 프로필' + 
                '</ion-item>' + 
                '<ion-item nav-clear menu-close ui-sref="app.preference">' + 
                    '<i class="icon ion-gear-b"></i> 설정' + 
                '</ion-item>' + 
            '</ion-list>'
        };
    })
    .controller('elidomMenuBar', function($scope) {
    });