'use strict';

/**
 * @ngdoc service
 * @name core.services.AuthService
 * @description 인증 서비스
 */
angular.module('Elidom.Core')
  .factory('AuthService', function($rootScope, $http, $ionicPopup, localStorageService, API_ENDPOINT) {

    var authenticated = false;

    return {

      /**
       * get end point
       */
      getEndpoint : function() { 
        return API_ENDPOINT.port ? (API_ENDPOINT.protocol + '://' + API_ENDPOINT.host + ':' + API_ENDPOINT.port + API_ENDPOINT.path) : (API_ENDPOINT.protocol + '://' + API_ENDPOINT.host + API_ENDPOINT.path); 
      },

      /**
       * signin의 경우 https로 요청 
       */
      getSigininEndpoint : function() {
        if(API_ENDPOINT.mode == 'PRODUCTION') {
          return 'https' + '://' + API_ENDPOINT.host + ':' + API_ENDPOINT.port + API_ENDPOINT.path;
        } else {
          return this.getEndpoint() + 'login';
        }
      },
      
      /**
       * 서버 에러 발생시 에러 처리 
       */
      handleError : function(response) {
        if(response && response.status && response.status == 401) {
          $rootScope.goSignin("세션이 유효하지 않습니다. 로그인 후 이용하세요.");

        } else {
          if(!response) {
            var msg = '서버 접속에 실패했습니다.<br/>관리자에게 문의하세요.';
            this.showErrorMessage(msg);

          } else if(response.data) {
            this.showDetailErrorMessage(response.data);

          } else {
            var msg = (!response.status || response.status === 0 || response.status == 404) ? '서버 접속에 실패했습니다.<br/>관리자에게 문의하세요.' : ('Status : ' + response.status + ', ' + response.error);
            this.showErrorMessage(msg);
          }
        }
      },

      /**
       * Show Detail Error Message
       */
      showDetailErrorMessage : function(errorData) {
        $ionicPopup.alert({ title : '오류 (' + errorData.code + ')', template : 'status : ' + errorData.status + '<br/> message : ' + errorData.msg });
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
          var authParams = 'email=' + encodeURIComponent(userId) + '&password=' + encodeURIComponent(passwd);
          $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
          $http.defaults.headers.common['Accept'] = '*/*';
          var url = me.getSigininEndpoint();

          $http.post(url, authParams).
            success(function(data) {
              if (data.name) {
                me.authenticated = true;
              } else {
                me.authenticated = false;
              }
            
              goodCallback && goodCallback(me.authenticated);
            
            }).error(function(data, status, headers, config) {
              me.authenticated = false;
              badCallback && badCallback(me.authenticated);
            });
      },

      /**
       * signout
       */
      signout : function(goodCallback, badCallback) {
        $http.defaults.headers.common['Accept'] = '*/*';
        $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
        var me = this;

        $http.post('http://localhost:9003/logout', null).
          success(function(data, status, headers, config) {
            me.authenticated = false;
            goodCallback && goodCallback(data);
          })
          .error(function(data, status, headers, config) {
            badCallback && badCallback(data);
          });
      },

      /**
       * signin 상태인지 체크 
       */
      isSigned : function() {
        //var userId = localStorageService.get('user_id');
        //return (userId === null || userId === '') ? false : true;
        return this.authenticated;
      }
    };
  });