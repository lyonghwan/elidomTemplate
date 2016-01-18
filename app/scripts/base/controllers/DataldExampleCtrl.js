'use strict';

/**
 * @ngdoc function
 * @name Elidom.Base.controllers:ServiceCtrl
 * @description
 * # Service Controller
 */
angular.module('Elidom.Base')
	.controller('DataldExampleCtrl', function($scope, $state, MenuService, ApiService) {
		var fields = [{
				fieldName: "product_id",
				dataType: "text",
			}, {
				fieldName: "product_name"
			}, {
				fieldName: "customer_id"
			},
			"customer_name",
			"country",
			"phone",
			"unit",
			"currency", {
				fieldName: "unit_price",
				dataType: "number"
			}, {
				fieldName: "quantity",
				dataType: "number"
			}, {
				fieldName: "order_date",
				dataType: "datetime",
				datetimeFormat: "yyyy-MM-dd"
			}, {
				fieldName: "ship_date",
				dataType: "datetime",
				datetimeFormat: "iso"
			}
		];
		var ds = DataLudi.createGridDataSet();
		ds.setFields(fields);
		$scope.ds  = ds;

		var rs = new DataLudi.GridRowSource();
		rs.setDataSource(ds);

		ApiService.get('/service/api/list.json', {},
			function(data) {
				console.log(data);
				new DataLudi.loadCsvData(ds, data, {
					start: 1
				});
			});

		// var _mode;
		var dom = false;
		$scope.dom = dom;
		$scope.rs = rs;
		$scope.parentChangable = false;
		$scope.getVersion = function() {
			alert(DataLudi.getVersion());
		};

		$scope.triggerAPI = function(ds,data){
			ApiService.get('/data/my/orders_s.csv',
				function(data) {
					console.log(data);
					new DataLudi.loadCsvData(ds, data, {
						start: 1
					});
				});
		};
	});