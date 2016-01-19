'use strict';

/**
 * @ngdoc function
 * @name core.controllers:HomeCtrl
 * @description
 * # HomeController
 */
angular.module('Elidom.Core')
  .controller('FileUpDownCtrl', function($scope, $http, $ionicPopup, $timeout, Upload, MenuService, RestApiService, ionicMaterialInk, ionicMaterialMotion) {
    $scope.downfile = {
      'fileName' : 'Nice.xlsx'
    };

    $scope.urlToPublicFile = 'http://192.168.35.227:9001/downlaod';

    $scope.uploadFiles = function (files) {
        // $scope.files = files;
        if (files && files.length) {
            Upload.upload({
                url: 'http://192.168.35.227:9001/upload',
                data: {
                    file: files
                },
                arrayKey: ''
            }).then(function (response) {
                $timeout(function () {
                    $scope.result = response.data;
                });
            }, function (response) {
                if (response.status > 0) {
                    $scope.errorMsg = response.status + ': ' + response.data;
                }
            }, function (evt) {
                $scope.progress = 
                    Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
            });
        }
    };

    $scope.showfile = function(files){
      $scope.files = files;
       console.log(files);
    }

  });