'use strict';

/**
 * @ngdoc service
 * @name core.services.RestApiService
 * @description
 * # ApiService
 */
angular.module('Elidom.Core')
  .factory('RestApiService', function($rootScope, $http, $resource, $ionicPopup, $cordovaKeyboard, API_ENDPOINT, localStorageService, ElidomUtils) {

    // activate for basic auth
    if (API_ENDPOINT.needsAuth) {
      $http.defaults.headers.common.Authorization = 'Basic ' + ElidomUtils.encodeBase64(API_ENDPOINT.username + ':' + API_ENDPOINT.password);
    }

    // public api
    return {

      /**
       * context path까지의 Full URL
       */
      getServerUrl: function() {
        return API_ENDPOINT.port ? 
                (API_ENDPOINT.protocol + '://' + API_ENDPOINT.host + ':' + API_ENDPOINT.port) :
                (API_ENDPOINT.protocol + '://' + API_ENDPOINT.host);
      },

      /**
       * context path까지의 Full URL
       */
      getContextPathUrl: function() {
        if(!API_ENDPOINT.path || API_ENDPOINT.path == '' || API_ENDPOINT.path == '/') {
          return this.getServerUrl();
        } else {
          var firstChar = API_ENDPOINT.path[0];
          if(firstChar == '/') {
            return this.getServerUrl() + API_ENDPOINT.path;
          } else {
            return this.getServerUrl() + '/' + API_ENDPOINT.path;
          }
        }
      },

      /**
       * endpoint
       */
      getEndpoint: function() {
        var firstChar = (API_ENDPOINT.urlPrefix && API_ENDPOINT.urlPrefix.length > 0) ? API_ENDPOINT.urlPrefix[0] : '';
        if(firstChar == '/') {
          return this.getContextPathUrl() + API_ENDPOINT.urlPrefix;
        } else {
          return this.getContextPathUrl() + '/' + API_ENDPOINT.urlPrefix;
        }
      },

      /**
       * return full url
       */
      getFullUrl: function(url) {
        if(url.indexOf('http://') >= 0) {
          return url;
        } else {
          var firstChar = url[0];
          if(firstChar == '/') {
            return this.getEndpoint() + url;
          } else {
            return this.getEndpoint() + '/' + url;
          }          
        }
      },

      /**
       * Full URL(contextPath + url)을 리턴.
       */
      makeFullUrl : function(contextPath, url) {
        var firstChar = url[0];
        if(firstChar == '/') {
          return contextPath + url;
        } else {
          return contextPath + '/' + url;
        }
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
            var msg = (dataSet && dataSet.msg && dataSet.msg.length < 50) ? dataSet.msg : '서버 이상이 발생되었습니다.<br/>관리자에게 문의하세요.';
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
          if(response.data) {
            this.showDetailErrorMessage(response.data);
          } else {
            var msg = (!response.status || response.status === 0 || response.status == 404) ? '서버 접속에 실패했습니다.<br/>관리자에게 문의하세요.' : ('Status : ' + response.status + ', ' + response.statusText);
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
          return {'Content-Type' : 'application/json; charset=UTF-8', 'Accept' : 'application/json; charset=UTF-8', 'X-Check-Auto' : checkAuto, 'X-Auth' : userId };
        } else {
          return {'Content-Type' : 'application/json; charset=UTF-8', 'Accept' : 'application/json; charset=UTF-8' };
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
       * Success
       */
      invokeSuccess : function(dataSet, callback, badcallback) {
        var me = this;
        // 1. good
        /*if(dataSet.success) {
          me.handleSuccess(dataSet, callback);
        // 2. bad
        } else {
          me.handleFailure(dataSet, badcallback);
        }*/

        me.handleSuccess(dataSet, callback);
      },

      /**
       * Error
       */
      invokeError : function(status, data, errorcallback) {
        if(errorcallback) {
          errorcallback(status, data);
        } else {
          this.handleError({data : data, status : status });
        }
      },

      /**
       * find only one
       *
       * @url
       * @params
       * @callback
       * @badcallback
       */
      get : function(url, params, callback, badcallback, errorcallback) {
        var me = this;
        params = me.addCommonParams(params);
        var url = me.getFullUrl(url);
        var config = { headers : { 'Content-Type' : 'application/json;charset=UTF-8' } };

        $http.get(url, { params : params }, config)
          .success(function(dataSet, status, headers, config)  {
            me.invokeSuccess(dataSet, callback, badcallback);
          })
          .error(function(data, status, headers, config) {
            me.invokeError(status, data, errorcallback);
          });
      },

      /**
       * search list for pagination
       *
       * @url
       * @params
       * @callback
       * @badcallback
       */
      search : function(url, params, callback, badcallback, errorcallback) {
         var me = this;

        if(params) {
          params.page = params.page ? params.page : 1;
          params.start = params.start ? params.start : 0;
          params.limit = params.limit ? params.limit : 20;
        }

        params = me.addCommonParams(params);
        var url = me.getFullUrl(url);
        var config = { headers : { 'Content-Type' : 'application/json;charset=UTF-8' } };

        $http.get(url, { params : params }, config)
          .success(function(dataSet, status, headers, config)  {
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
          })
            // 3. error
          .error(function(data, status, headers, config) {
            me.invokeError(status, data, errorcallback);
          });
      },

      /**
       * post 요청 
       *
       * @url
       * @params
       * @callback
       * @badcallback
       * @errorcallback
       */
      post : function(url, params, callback, badcallback, errorcallback) {
        var me = this;
        var fullUrl = me.getFullUrl(url);
        $http.defaults.headers.post['Content-Type'] = 'application/json; charset=UTF-8';

        $http.post(fullUrl, params)
          .success(function (dataSet, status) {
            me.invokeSuccess(dataSet, callback, badcallback);
          })
          .error(function (data, status) {
            me.invokeError(status, data, errorcallback);
          }
        );
      },

      /**
       * post 요청으로 검색  
       *
       * @url
       * @params
       * @callback
       * @badcallback
       * @errorcallback
       */
      searchBypost : function(url, params, callback, badcallback, errorcallback) {
        var me = this;
        var fullUrl = me.getFullUrl(url);
        $http.defaults.headers.post['Content-Type'] = 'application/json; charset=UTF-8';
        if(params) {
          params.page = params.page ? params.page : 1;
          params.start = params.start ? params.start : 0;
          params.limit = params.limit ? params.limit : 20;
        }

        $http.post(fullUrl, params)
          .success(function (dataSet, status) {
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
          })
          .error(function (data, status) {
            me.invokeError(status, data, errorcallback);
          }
        );
      },

      /**
       * put 요청 
       *
       * @url
       * @params
       * @callback
       * @badcallback
       * @errorcallback
       */
      put : function(url, params, callback, badcallback, errorcallback) {
        var me = this;
        var fullUrl = me.getFullUrl(url);
        $http.defaults.headers.put['Content-Type'] = 'application/json; charset=UTF-8';

        $http.put(fullUrl, params)
          .success(function (dataSet, status) {
            me.invokeSuccess(dataSet, callback, badcallback);
          })
          .error(function (data, status) {
            me.invokeError(status, data, errorcallback);
          }
        );
      },

      /**
       * delete 요청 
       *
       * @url
       * @params
       * @callback
       * @badcallback
       */
      delete : function(url, params, callback, badcallback, errorcallback) {
        var me = this;
        var fullUrl = me.getFullUrl(url);
        $http.defaults.headers.delete = {'Content-Type' : 'application/json; charset=UTF-8'};

        $http.delete(fullUrl, params)
          .success(function (dataSet, status) {
            me.invokeSuccess(dataSet, callback, badcallback);
          })
          .error(function (data, status) {
            me.invokeError(status, data, errorcallback);
          }
        );        
      }

      // ------------------------------------------------------------------------------------------------
    };

  });