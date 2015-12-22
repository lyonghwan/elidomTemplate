'use strict';

/**
 * @ngdoc function
 * @name GulpTest.serive:ExampleService
 * @description
 * # ExampleService
 */
angular.module('ElidomTemplate')
  // use factory for services
  .factory('ExampleService', function($http, $timeout, $q, ApiService) {

    var kindOfPrivateVariable = 42;

    var doAsync = function() {
      var deferred = $q.defer();
      var a ="error";
      deferred.resolve(a);
      console.log(a);
      return deferred.promise;
    };

    var getApi = function() {
        var config = { headers : {} };
        config.headers['Content-Type'] = 'application/json;charset=UTF-8';

        var url = ApiService.getEndpoint() + '/dnb/service/user/register.json';

        var dataParams= { param : 'Hello'};

        var response = $http.get(url, dataParams, config)
          .success(function(data, status, headers, config)  {
            console.log(data);
          })
          .error(function(data, status, headers, config) {
            console.log(status,config);
          });

      return response;
    };

    var postApi = function() {
      var config = { headers : {'Content-Type' : 'application/json;charset=UTF-8'} };
      var url = ApiService.getEndpoint() + '/dnb/service/user/register.json';
      var params = {
         userId : "mw1106.kim",
         userNm : "Kim minwoo"
      };
       
      var response = $http.post(url, params, config)
                       .success(function(data, status, headers, config)  {
                         console.log(data);
                       })
                       .error(function(data, status, headers, config) {
                         console.log('headers : ' + headers);
                         console.log('config : ' + config);
                         console.log('data: ' + data);
                         console.log('status:' + status);
                       });

      return response;
    };

    var putApi = function() {
      var config = { headers : {} };
      config.headers['Content-Type'] = 'application/json;charset=UTF-8';

      var url = ApiService.getEndpoint() + '/dnb/service/user/register.json';

      var dataParams= { param : 'Hello'};

      var response = $http.put(url, dataParams, config)
        .success(function(data, status, headers, config)  {
          console.log(data);
        })
        .error(function(data, status, headers, config) {
          console.log(status,config);
        });

      return response;
    };

    var fetchSomethingFromServer = function() {
       var response = $http({
          url: 'http://hipsterjesus.com/api',
          params: {
              paras: 2
          },
          method: 'GET'
        })
        .success(function(data) {
          // console.log('fetched this stuff from server:', data);
        })
        .error(function(error) {
          console.log('an error occured', error);
        });

      return response;
    };

    // public api
    return {
      doAsync: doAsync,
      fetchSomethingFromServer: fetchSomethingFromServer,
      fetchGetServer : getApi,
      fetchPostServer : postApi,
      fetchPutServer : putApi
    };

  });
