'use strict';

/**
 * @ngdoc service
 * @name ElidomTemplate.ApiService
 * @description
 * # ApiService
 * Retrieves correct api to make requests against.
 * Uses settings from API_ENDPOINT defined in /config/apiEndpoint.js
 *
 * Usage example: $http({
 *                      url: ApiService.me.getEndpoint() + '/things',
 *                      method: 'GET'
 *                 })
 *
 */
angular.module('ElidomTemplate')
  .factory('ApiService', function($window, $http, $ionicPopup, $resource, API_ENDPOINT) {

    var _api = API_ENDPOINT;
    var endpoint = _api.port ? (_api.host + ':' + _api.port + _api.path) : (_api.host + _api.path);

    // activate for basic auth
    if (_api.needsAuth) {
      $http.defaults.headers.common.Authorization = 'Basic ' + $window.btoa(_api.username + ':' + _api.password);
    }

    // public api
    return {
      getEndpoint: function() { return endpoint; },

      isSignedIn : function(callback) {
        var me = this;

        if(typeof login === 'undefined') {
          callback({status : 401});

        } else {
          var rsc = $resource(me.getEndpoint()+'/users/' + login.id + '.json', {});

          rsc.get(null,
            // good
            function(data, response) {
              callback(data, response);
            // bad
            }, function(response) {
              callback(null, response);
            });
        }
      },

      handleError : function(response) {
        if(response && response.status && response.status == 401) {
          this.goToSingin();
        } else {
          this.showErrorMessage(response);
        }
      },

      showErrorMessage : function(response) {
        if(status == 0) {
          $ionicPopup.alert({
              title: 'Error', 
              template: "서버이상이 발생되었습니다. 서버상태를 확인 해주세요." });
        } else {
          $ionicPopup.alert({
              title: 'Error', 
              template: 'Status : ' + response.status + ', ' + response.statusText });
        }
      },

      /**
       * search list for pagination
       *
       * @url
       * @params
       * @callback
       */
      search : function(url, params, callback) {
         var me = this;

        if(params) {
          params.page = params.page ? params.page : 1;
          params.start = params.start ? params.start : 0;
          params.limit = params.limit ? params.limit : 20;
        }

        var rsc = $resource(me.getEndpoint()+url, params);

        rsc.get(
          // good
          function(dataSet, response) {
            dataSet.start = params.start;
            dataSet.limit = params.limit;
            dataSet.page = Math.ceil(dataSet.start / dataSet.limit) + 1;
            dataSet.total_page = (dataSet.total > params.limit) ? Math.ceil(dataSet.total / params.limit) : 1;
            callback(dataSet);

          // bad
          }, function(response) {
            me.handleError(response);
          });
      },

      /**
       * find list
       *
       * @url
       * @params
       * @callback
       */
      list : function(url, params, callback) {
        var me = this;
        var rsc = $resource(me.getEndpoint()+url, params);


        rsc.get(
          // good
          function(dataSet, response) {
            callback(dataSet.items);

          // bad
          }, function(response) {
            me.handleError(response);
          });
      },
      
      /**
       * find only one
       *
       * @url
       * @params
       * @callback
       */
      get : function(url, params, callback, badcallback) {
        var me = this;
        var rsc = $resource(me.getEndpoint()+url, params);

        rsc.get(
          // good
          function(data, response) {
            callback(data);

          // bad
          }, function(response) {
            if(badcallback){
              badcallback(response);
            }else{
              me.handleError(response);
            }
          });
      },

      checkUnique : function(url, params, callback, existscallback, badcallback){
        var me = this;

        me.get(me.getEndpoint()+url, params,
          function(data,response) {
            existscallback(data);
          }, 
          function(response) {
            if(response.status==404){
              callback(response);
            }else{
              badcallback(response);
            }
          });
      },

      /**
       * find only one by name
       *
       * @url
       * @params
       * @callback
       */
      getByName : function(url, params, callback) {
        var me = this;
        var rsc = $resource(me.getEndpoint()+url, params);

        rsc.get(
          // good
          function(data, response) {
            callback(data);

          // bad
          }, function(response) {
            me.handleError(response);
          });
      },

      /**
       * create resource
       * 
       * @param  {string}
       * @param  {object}
       * @param  {object}
       * @return N/A
       */
      create : function(url, params, entity) {
        var me = this;
        var rsc = $resource(me.getEndpoint()+url, params, {
          create: {
            method: 'POST',
            headers: { "Content-Type": "application/json;charset=UTF-8" },
            transformRequest: function(data, headers) {
              headers = angular.extend({}, headers, {'Accept' : '*/*', 'Content-Type': 'application/json;charset=UTF-8'});
              return angular.toJson(entity);
            }
          }
        });

        return rsc.create();
      },

      /**
       * update resource
       * 
       * @param  {string}
       * @param  {object}
       * @param  {object}
       * @return N/A
       */
      update : function(url, params, entity) {
        var me = this;
        var rsc = $resource(me.getEndpoint()+url, params, {
          update: {
            method: 'PUT',
            headers: {"Content-Type": "application/json;charset=UTF-8" },
            transformRequest: function(data, headers) {
              headers = angular.extend({}, headers, {'Accept' : '*/*', 'Content-Type': 'application/json;charset=UTF-8'});
              return angular.toJson(entity);
            }
          }
        });

        return rsc.update();
      },

      /**
       * update multiple resource
       * 
       * @param  {string}
       * @param  {object}
       * @param  {object}
       * @return N/A
       */
      updateMultiple : function(url, params, entityList) {
        var me = this;
        var rsc = $resource(me.getEndpoint()+url, params, {
          updateMultiple: {
            method: 'POST',
            headers: { "Accept" : "*/*", "Content-Type": "application/json;charset=UTF-8" },
            transformRequest: function(data, headers) {
              headers = angular.extend({}, headers, {'Accept' : '*/*', 'Content-Type': 'application/json;charset=UTF-8'});
              return angular.toJson({ multiple_data : entityList });
            }
          }
        });

        return rsc.updateMultiple();
      },

      /**
       * delete resource
       * 
       * @param  {string}
       * @param  {object}
       * @return N/A
       */
      delete : function(url, params) {
        var me = this;
        var rsc = $resource(me.getEndpoint()+url, {}, {
          delete: {
            method: 'DELETE',
            headers: { "Accept" : "*/*", "Content-Type": "application/json;charset=UTF-8" }
          }
        });

        return rsc.delete();
      }

    };

  });

