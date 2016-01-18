'use strict';

/**
 * @ngdoc function
 * @name core.controllers:HomeCtrl
 * @description
 * # HomeController
 */
angular.module('Elidom.Core')
  .controller('HomeCtrl', function($scope, $http, $ionicPopup, MenuService, RestApiService, ionicMaterialInk, ionicMaterialMotion) {

    /**
     * 메뉴 
     */
    MenuService.setSideMenu('main');

    /**
     * Application information
     */
    $scope.info = null;
    /**
     * Metrics
     */
    $scope.metrics = null;
    /**
     * Chart Color
     */
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

    /**
     * Total Memory
     */
    $scope.totalMemoryTitle = "Total";
    $scope.totalMemoryLabels = ["Used", "Unused"];
    $scope.totalMemoryData = [0, 0];

    /**
     * Heap Memory
     */
    $scope.heapMemoryTitle = "Heap";
    $scope.heapMemoryLabels = ["Used", "Unused"];
    $scope.heapMemoryData = [0, 0];

    /**
     * Thread
     */
    $scope.threadLabels = ['Current', 'Deamon', 'Peak', 'Total Started'];
    $scope.threadSeries = ['Count'];
    $scope.threadData = [[0, 0, 0, 0]];

    /**
     * Get application information
     */
    $scope.getAppInfo = function() {
        var serverUrl = RestApiService.getServerUrl();
        var url = RestApiService.makeFullUrl(serverUrl, '/info');
        
        $scope.invokeHttpGet(url, null, 
            function(dataSet) {
                $scope.info = dataSet;
            });
    };

    /**
     * Get metrics
     */
    $scope.getMetrics = function() {
        var serverUrl = RestApiService.getServerUrl();
        var url = RestApiService.makeFullUrl(serverUrl, '/metrics');

        $scope.invokeHttpGet(url, null, 
            function(dataSet) {
                $scope.metrics = dataSet;
                $scope.setTotalMemory();
                $scope.setHeapMemory();
                $scope.setThreads();
            });
    };

    /**
     * Invoke http get
     */
    $scope.invokeHttpGet = function(url, params, callback, errorcallback) {
        var config = { headers : { 'Content-Type' : 'application/json;charset=UTF-8' } };
        $http.get(url, { params : params }, config)
          .success(function(dataSet, status, headers, config)  {
            callback(dataSet);
          })
          .error(function(data, status, headers, config) {
            RestApiService.invokeError(status, data, errorcallback);
          });
    };

    $scope.setTotalMemory = function() {
        var total = Math.ceil($scope.metrics.mem / 1000);
        var free = Math.ceil($scope.metrics['mem.free'] / 1000);
        var used = total - free;
        $scope.totalMemoryTitle = "Total (" + total + "M)";
        $scope.totalMemoryLabels = ["Used", "Unused"];
        $scope.totalMemoryData = [used, free];
    };

    $scope.setHeapMemory = function() {
        var total = Math.ceil($scope.metrics['heap.committed'] / 1000);
        var used = Math.ceil($scope.metrics['heap.used'] / 1000);
        var free = total - used;
        $scope.heapMemoryTitle = "Heap (" + total + "M)";
        $scope.heapMemoryLabels = ["Used", "Unused"];
        $scope.heapMemoryData = [used, free];
        $scope.metrics.heap = Math.ceil($scope.metrics.heap / 1000) + ' M';
        $scope.metrics['heap.init'] = Math.ceil($scope.metrics['heap.init'] / 1000) + ' M';
        $scope.metrics['gc.ps_scavenge.time'] = $scope.metrics['gc.ps_scavenge.time'] + ' ms';
        $scope.metrics['gc.ps_marksweep.time'] = $scope.metrics['gc.ps_marksweep.time'] + ' ms';
    };

    $scope.setThreads = function() {
        $scope.threadData = [[
            $scope.metrics['threads.peak'],
            $scope.metrics['threads.daemon'],
            $scope.metrics['threads.totalStarted'],
            $scope.metrics['threads']
        ]];

        $scope.metrics['httpsessions.max'] = $scope.metrics['httpsessions.max'] < 0 ? 'Unlimited' : $scope.metrics['httpsessions.max'];
    };

    /*$scope.lineLabels = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
    $scope.lineSeries = ['Series A', 'Series B'];
    $scope.lineData = [
        [65, 59, 80, 81, 56, 55, 40],
        [28, 48, 40, 19, 86, 27, 90]
    ];

    $scope.radarLabels =["Eating", "Drinking", "Sleeping", "Designing", "Coding", "Cycling", "Running"];
    $scope.radarSeries = ['Series A', 'Series B'];
    $scope.radarData = [
        [65, 59, 90, 81, 56, 55, 40],
        [28, 48, 40, 19, 96, 27, 100]
    ];*/

    /**
     * Activate ink for controller
     */
    ionicMaterialInk.displayEffect();

    /**
     * animation
     */
    ionicMaterialMotion.pushDown({
        selector: '.push-down'
    });

    /**
     * animation
     */
    ionicMaterialMotion.fadeSlideInRight({
        selector: '.animate-fade-slide-in .item'
    });

    /**
     * initialize
     */
    $scope.init = function() {
        $scope.getAppInfo();
        $scope.getMetrics();
    };

  });