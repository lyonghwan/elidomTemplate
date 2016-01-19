'use strict';

/**
 * @ngdoc function
 * @name Elidom.Base.controllers:ServiceCtrl
 * @description
 * # Service Controller
 */
angular.module('Elidom.Base')
	.controller('DataldExampleCtrl', function($scope, $state, MenuService, ApiService) {
		// var fields = [{
		// 		fieldName: 'beanClassName',
		// 		dataType: 'text'
		// 	}, {
		// 		fieldName: 'description',
		// 		dataType: 'text'
		// 	}, {
		// 		fieldName: 'id',
		// 		dataType: 'text'
		// 	}, {
		// 		fieldName: 'module',
		// 		dataType: 'text'
		// 	}, {
		// 		fieldName: 'name',
		// 		dataType: 'text'
		// 	}
		// ];
		var fields = [{
				fieldName: 'beanClassName'
			}, {
				fieldName: 'description'
			}, {
				fieldName: 'id'
			}, {
				fieldName: 'module'
			}, {
				fieldName: 'name'
			}
		];
		var ds = DataLudi.createGridDataSet();
		ds.setFields(fields);
		$scope.datasource  = ds;

		var rs = new DataLudi.GridRowSource();
		ApiService.get('/api/list.json', {},
			function(data) {
				console.log(data.items);
				var items = [];

				for(var i=0; i<data.items.length; i++){
					delete data.items[i]['apiList'];
					var item = {
						'beanClassName' : data.items[i]['beanClassName'],
						'description'   : data.items[i]['description'],
						'id' : data.items[i]['id'],
						'module' : data.items[i]['module'],
						'name' : data.items[i]['name']
					}
					items.push(item);
				}
				console.log(items);
				ds.setRows(items);
			});
		console.log(ds);
		rs.setDataSource(ds);
		console.log(rs);
    	// $scope.dom = _mode == 'dom';
    	$scope.rs = rs;
		$scope.parentChangable = false;
		$scope.getVersion = function() {
			alert(DataLudi.getVersion());
		};

		$scope.triggerAPI = function(ds){
			ApiService.get('/api/list.json',
			function(data) {
				console.log(data.items.length);
				var items = data.items;
				ds.setRows(data.items);
			});
		};
	});