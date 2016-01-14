'use strict';

/**
 * @ngdoc service
 * @name core.services.AuthService
 * @description 인증 서비스
 *  TODO Token Based 인증으로 수정 필요
 */
angular.module('Elidom.Core')
  .factory('AuthService', function($rootScope, $http, $ionicPopup, localStorageService, API_ENDPOINT) {

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
          return 'https://newclip.nicednb.com:458/mobile/login/clipLogin.json';
        } else {
          return this.getEndpoint() + '/login'; 
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
        var url = this.getSigininEndpoint();
        //var params = "username=" + userId + "&password=" + passwd;
        var params = "username=" + userId;
        //var params = { email : userId, password: passwd };
        $http.defaults.headers.common['Accept'] = '*/*';
        $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
        //$http.defaults.headers.post['Content-Type'] = 'application/json; charset=UTF-8';

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
        var url = this.getEndpoint() + '/logout.json';
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