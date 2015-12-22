'use strict';

/**
 * @ngdoc service
 * @name ElidomTemplate.services.AuthService
 * @description 인증 서비스
 *  TODO Token Based 인증으로 수정 필요
 */
angular.module('ElidomTemplate')
  .factory('AuthService', function($rootScope, $http, $ionicPopup, localStorageService, API_ENDPOINT) {

    return {

      /**
       * get end point
       */
      getEndpoint : function() { 
        return API_ENDPOINT.port ? (API_ENDPOINT.host + ':' + API_ENDPOINT.port + API_ENDPOINT.path) : (API_ENDPOINT.host + API_ENDPOINT.path); 
      },

      /**
       * signin의 경우 https로 요청 
       */
      getSigininEndpoint : function() {
        if(API_ENDPOINT.mode == 'PRODUCTION') {
          return 'https://newclip.nicednb.com:458/mobile/login/clipLogin.json';
        } else {
          return this.getEndpoint() + '/login/clipLogin.json'; 
        }
      },
      
      /**
       * 서버 에러 발생시 에러 처리 
       */
      handleError : function(data, status, headers, config) {
        var msg = (!status || status === 0 || status == 404) ? '서버 접속에 실패했습니다.<br/>관리자에게 문의하세요.' : ('Status : ' + status + ', ' + data);
        this.showErrorMessage(msg);
      },

      /**
       * show error message
       */
      showErrorMessage : function(msg) {
        $ionicPopup.alert({ title : '오류', template : msg });
      },      

      /**
       * signin
       */
      signin : function(userId, passwd, autosignin, goodCallback, badCallback) {
        var me = this;
        var url = this.getSigininEndpoint();
        var params = "user_id=" + userId + "&passwd=" + passwd;
        $http.defaults.headers.common['Accept'] = '*/*';
        $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';

        $http.post(url, params).
          success(function(data, status, headers, config) {
            if(data.success) {
              if(localStorageService.isSupported) {
                localStorageService.set('user_id', userId);
                localStorageService.set('autosignin', autosignin);
              }

              if(goodCallback) {
                goodCallback(data);
              }
            } else {
              if(badCallback) {
                badCallback(data);
              }
            }
          })
          .error(function(data, status, headers, config) {
            me.handleError(data, status, headers, config);
          });
      },

      /**
       * signout
       */
      signout : function(goodCallback, badCallback) {
        var url = this.getEndpoint() + '/login/clipLogout.json';
        $http.defaults.headers.common['Accept'] = '*/*';
        $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';

        $http.post(url, null).
          success(function(data, status, headers, config) {
            if(data.success) {
              if(localStorageService.isSupported) {
                localStorageService.remove('user_id');
                localStorageService.remove('autosignin');
              }

              if(goodCallback) {
                goodCallback(data);
              }
            } else {
              if(badCallback) {
                badCallback(data);
              }
            }
          })
          .error(function(data, status, headers, config) {
            if(badCallback) {
              badCallback(data);
            }
          });
      },

      /**
       * signin 상태인지 체크 
       */
      isSigned : function() {
        var userId = localStorageService.get('user_id');
        return (userId === null || userId === '') ? false : true;
      }
    };
  });