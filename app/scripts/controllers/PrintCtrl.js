'use strict';

/**
 * @ngdoc function
 * @name ElidomTemplate.controllers:PrintCtrl
 * @description
 * # PrintController
 */
angular.module('ElidomTemplate')
    .controller('PrintCtrl', function($scope, $ionicPopup, $timeout, ionicMaterialInk, ionicMaterialMotion, MenuService, ApiService, ElidomUtils) {

    /**
     * 메뉴 
     */
    MenuService.setSideMenu('main');
    /**
     * Printing 정보 
     */
    $scope.printInfo = {
        printerName : 'TEC_B_SX4T',
        printUrl : '/agent/service/printlabel/print.json'
    };
    /**
     * 검색 진행 중 여부 - For Spinner show / hide
     */
    $scope.searching = false;
    /**
     * Activate ink for controller
     */
    ionicMaterialInk.displayEffect();
    /**
     * Material Motion
     */
    ionicMaterialMotion.pushDown({
        selector: '.push-down'
    });
    /**
     * Material Motion
     */
    ionicMaterialMotion.fadeSlideInRight({
        selector: '.animate-fade-slide-in .item'
    });

    /**
     * Print Label
     */
    $scope.printLabel = function() {
        var params = { printerName : $scope.printInfo.printerName };

        if($scope.validatePrint()) {
            $scope.searching = true;
            ApiService.post($scope.printInfo.printUrl, params);
        }
    },

    /**
     * Print를 위한 데이터 체크 
     */
    $scope.validatePrint = function() {
        if(ElidomUtils.isEmpty($scope.printInfo.printerName)) {
            $ionicPopup.alert({ title : '프린터 이름을 입력하세요' });
            return false;
        }

        if(ElidomUtils.isEmpty($scope.printInfo.printUrl)) {
            $ionicPopup.alert({ title : '호출 URL을 입력하세요' });
            return false;
        }

        return true;
    },

    /**
     * 검색 종료 이벤트를 받아서 스피너 중단.
     * 검색 종료 이벤트는 APIService에서 검색 완료/실패/에러시 모두 notify
     */
    $scope.$on('search.complete', function(event) {
        $scope.searching = false;
    });
});