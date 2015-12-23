'use strict';

/**
 * @ngdoc service
 * @name core.services.ApiService
 * @description
 * # ApiService
 */
angular.module('Elidom.Core')
  .factory('ApiService', function($rootScope, $http, $ionicPopup, $resource, $cordovaKeyboard, API_ENDPOINT, localStorageService, ElidomUtils) {

    // activate for basic auth
    if (API_ENDPOINT.needsAuth) {
      $http.defaults.headers.common.Authorization = 'Basic ' + ElidomUtils.encodeBase64(API_ENDPOINT.username + ':' + API_ENDPOINT.password);
    }

    // public api
    return {
      /**
       * endpoint
       */
      getEndpoint: function() { 
        return API_ENDPOINT.port ? (API_ENDPOINT.host + ':' + API_ENDPOINT.port + API_ENDPOINT.path) : (API_ENDPOINT.host + API_ENDPOINT.path); 
      },

      /**
       * return full url
       */
      getFullUrl : function(url) { 
        return this.getEndpoint() + url;
      },

      /**
       * signin으로 이동 
       */
      goToSignin : function(msg) {
        var message = msg ? msg : '세션이 유효하지 않습니다. 로그인 후 이용하세요.';
        $rootScope.goSignin(message);
      },

      /**
       * 조회 성공시 처리 
       */
      handleSuccess : function(dataSet, callback) {
        $rootScope.$broadcast('search.complete');

        if(callback) {
          callback(dataSet);
        }
      },

      /**
       * 조회 실패시 처리 
       */
      handleFailure : function(dataSet, callback) {
        $rootScope.$broadcast('search.complete');

        if(dataSet && dataSet.status && dataSet.status == 401) {
          this.goToSignin(dataSet.msg);
        } else {
          if(callback) {
            callback(dataSet);
          } else {
            var msg = (dataSet && dataSet.msg && dataSet.msg.length < 50) ? dataSet.msg : '서버이상이 발생되었습니다.<br/>관리자에게 문의하세요.';
            this.showErrorMessage(msg);
          }
        }
      },

      /**
       * 서버 에러 발생시 에러 처리 
       */
      handleError : function(response) {
        $rootScope.$broadcast('search.complete');

        if(response && response.status && response.status == 401) {
          this.goToSignin();
        } else {
          var msg = (!response.status || response.status === 0 || response.status == 404) ? '서버 접속에 실패했습니다.<br/>관리자에게 문의하세요.' : ('Status : ' + response.status + ', ' + response.statusText);
          this.showErrorMessage(msg);
        }
      },

      /**
       * show error message
       */
      showErrorMessage : function(msg) {
        $ionicPopup.alert({ title : '오류', template : msg });
      },

      /**
       * 공통 파라미터를 추가한다. 
       */
      addCommonParams : function(params) {
        //모든 API 진행 전 Keyboard를 닫아 준다
        if (window.cordova && window.cordova.plugins.Keyboard) {
          $cordovaKeyboard.close();
        }

        return params;
      },

      /**
       * Headers For Get
       */
      getHeaders : function() {
        if (window.cordova && window.cordova.plugins.Keyboard) {
          var userId = this.getEncodedUserId();
          var checkAuto = localStorageService.get("autosignin") ? localStorageService.get("autosignin") : false;
          return {'Accept' : 'application/json; charset=UTF-8', 'X-Check-Auto' : checkAuto, 'X-Auth' : userId };
        } else {
          return {'Accept' : 'application/json; charset=UTF-8' };
        }
      },

      /**
       * encoding된 userId를 리턴 
       */
      getEncodedUserId : function() {
        var userId = localStorageService.get("user_id");
        if(userId) {
          return ElidomUtils.encodeBase64(userId);
        } else {
          return '';
        }
      },      

      /**
       * search list for pagination
       *
       * @url
       * @params
       * @callback
       * @badcallback
       */
      search : function(url, params, callback, badcallback) {
         var me = this;

        if(params) {
          params.page = params.page ? params.page : 1;
          params.start = params.start ? params.start : 0;
          params.limit = params.limit ? params.limit : 20;
        }

        params = me.addCommonParams(params);
        var rsc = $resource(me.getFullUrl(url), params, {get : {method : 'GET', headers : me.getHeaders()}});

        rsc.get(
          function(dataSet, response) {
            // 1. good
            if(dataSet.success) {
              dataSet.start = params.start;
              dataSet.limit = params.limit;
              dataSet.page = Math.ceil(dataSet.start / dataSet.limit) + 1;
              dataSet.totalPage = (dataSet.total > params.limit) ? Math.ceil(dataSet.total / params.limit) : 1;
              me.handleSuccess(dataSet, callback);
            // 2. bad
            } else {
              me.handleFailure(dataSet, badcallback);
            }
          // 3. error
          }, 
          function(response) {
            me.handleError(response);
          });
      },

      /**
       * find list
       *
       * @url
       * @params
       * @callback
       * @badcallback
       */
      list : function(url, params, callback, badcallback, errorCallback) {
        var me = this;
        params = this.addCommonParams(params);
        var rsc = $resource(me.getFullUrl(url), params, {get : {method : 'GET', headers : me.getHeaders()}});

        rsc.get(
          function(dataSet, response) {
            // 1. good
            if(dataSet.success) {
              me.handleSuccess(dataSet, callback);
            // 2. bad
            } else {
              me.handleFailure(dataSet, badcallback);
            }
          // 3. error
          }, 
          function(response) {
            if(errorCallback) {
              errorCallback(response);
            } else {
              me.handleError(response);
            }
          });
      },

      /**
       * find only one
       *
       * @url
       * @params
       * @callback
       * @badcallback
       */
      get : function(url, params, callback, badcallback) {
        var me = this;
        params = me.addCommonParams(params);
        var rsc = $resource(me.getFullUrl(url), params, {get : {method : 'GET', headers : me.getHeaders()}});

        rsc.get(
          function(dataSet, response) {
            // 1. good
            if(dataSet.success) {
              me.handleSuccess(dataSet, callback);
            // 2. bad
            } else {
              me.handleFailure(dataSet, badcallback);
            }
          // 3. error
          }, 
          function(response) {
            me.handleError(response);
          });
      },

      /**
       * post 요청 
       *
       * @url
       * @params
       * @callback
       * @badcallback
       */
      post : function(url, params, callback, badcallback) {
        var me = this;
        var fullUrl = me.getFullUrl(url);
        $http.defaults.headers.post['Content-Type'] = 'application/json; charset=UTF-8';
        //var checkAuto = localStorageService.get("autosignin");
        //$http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
        //$http.defaults.headers.post['X-Check-Auto'] = checkAuto;
        //$http.defaults.headers.post['X-Auth'] = this.getEncodedUserId();

        $http.post(fullUrl, params)
          .success(function (dataSet, status) {
            // 1. good
            if(dataSet.success) {
              me.handleSuccess(dataSet, callback);
            // 2. bad
            } else {
              me.handleFailure(dataSet, badcallback);
            }
          })
          .error(function (data, status) {
            me.handleError({data : data, status : status });
          }
        );
      }

      // ------------------------------------------------------------------------------------------------
    };

  });