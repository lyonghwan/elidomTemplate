'use strict';

/**
 * @ngdoc function
 * @name ElidomTemplate.controller:HomeController
 * @description
 * # HomeController
 */
angular.module('ElidomTemplate')
  .controller('HomeController', function($scope, ExampleService, ApiService) {

    $scope.myHTML = null;
    $scope.from_date ={};
    $scope.to_date = {};
    $scope.data_model= new Date();

    // just an example...
    $scope.fetchRandomText = function() {
      ExampleService.doAsync()
        .then(ExampleService.fetchSomethingFromServer)
        .then(function(response) {
            $scope.myHTML = response.data.text;
            $scope.$broadcast('scroll.refreshComplete');
        },function(error) {
            $scope.myHTML = error;
            $scope.$broadcast('scroll.refreshComplete');
        });
    };

    $scope.fetchGetTest = function() {
      var params ={
        params : "hi"
      }
      ApiService.get('/dnb/service/user/register.json', params, function(dataSet) {
            console.log(dataSet);
      });
    };

    $scope.fetchPostTest = function() {

      var params ={
        userId : "lyonghwan",
        userNm : "lyonghwan"
      }
      var result = ApiService.update('/dnb/service/user/register.json', null, params);

      result.$promise.then(
        function(data) {
          console.log(data);
          $scope.myHTML = data.userNm;
        }, function(error) {
          console.log(error);
        });
    };

    $scope.fetchPutTest = function() {

      var params ={
        userId : "lyonghwan",
        userNm : "박용"
      }
      var result = ApiService.create('/dnb/service/user/register.json', null, params);

      result.$promise.then(
        function(data) {
          console.log(data);
          $scope.myHTML = data.userNm;
        }, function(error) {
          console.log(error);
        });
    };


    $scope.fetchRandomText();

    $scope.$watch('data_model', function(newValue, oldValue) {
        if (newValue)
          console.log($scope.DataModel);

    }, true);

    $scope.print = function(){
      console.log($scope.data_model);
    }

  });
