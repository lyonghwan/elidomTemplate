'use strict';

/**
 * @ngdoc function
 * @name core.controllers:HomeCtrl
 * @description
 * # HomeController
 */
angular.module('Elidom.Core')
  .controller('HomeCtrl', function($scope, MenuService, ApiService, ionicMaterialInk, ionicMaterialMotion) {

    /**
     * 메뉴 
     */
    MenuService.setSideMenu('main');

    $scope.lineLabels = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
    $scope.lineSeries = ['Series A', 'Series B'];
    $scope.lineData = [
        [65, 59, 80, 81, 56, 55, 40],
        [28, 48, 40, 19, 86, 27, 90]
    ];
    $scope.chartColor = [ {
        strokeColor: "rgba(255,50,0,0.5)",
        fillColor: "rgba(255,153,102,0.2)",
        highlightFill: "rgba(151,187,205,0.75)",
        highlightStroke: "rgba(151,187,205,1)",
        pointColor: "rgba(255,50,0,1)",            
        pointStrokeColor: "#fff",
        pointHighlightFill: "#fff",
        pointHighlightStroke: "rgba(220,220,220,1)"
    } ];

    $scope.barLabels = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
    $scope.barSeries = ['Series A', 'Series B'];
    $scope.barData = [
        [65, 59, 80, 81, 56, 55, 40],
        [28, 48, 40, 19, 86, 27, 90]
    ];

    $scope.doughnutLabels = ["Series A", "Series B", "Series C"];
    $scope.doughnutData = [300, 500, 100];

    $scope.radarLabels =["Eating", "Drinking", "Sleeping", "Designing", "Coding", "Cycling", "Running"];
    $scope.radarSeries = ['Series A', 'Series B'];
    $scope.radarData = [
        [65, 59, 90, 81, 56, 55, 40],
        [28, 48, 40, 19, 96, 27, 100]
    ];    

    // Activate ink for controller
    ionicMaterialInk.displayEffect();

    ionicMaterialMotion.pushDown({
        selector: '.push-down'
    });
    ionicMaterialMotion.fadeSlideInRight({
        selector: '.animate-fade-slide-in .item'
    });

  });