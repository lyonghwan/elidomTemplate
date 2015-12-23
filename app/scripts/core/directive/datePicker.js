'use strict';

/**
 * @ngdoc function
 * @name core.directive:datePicker
 * @description
 * # DatePicker
 */
angular.module('Elidom.Core')
	.directive('datePicker', function() {

		return {
			restrict : "E",
			// require  : "^ngModel",
			scope : {
				dateModel : "="
			},
			controller: function($scope, $filter) {
				var disabledDates = [
					new Date(1437719836326),
					new Date(2015, 7, 10),								// months are 0-based, this is August, 10th!
					new Date('Wednesday, August 12, 2015'), 			// Works with any valid Date formats like long format
					new Date("08-14-2015"), 							// Short format
					new Date(1439676000000) 							// UNIX format
				];

				var monthList = ["Jan", "Feb", "March", "April", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];
				var today = new Date()
				$scope.inputDate = $filter('date')(today, 'yyyyMMdd');

				$scope.datepickerObjectModal = {
					setButtonType : 'button-assertive',					// Optional
					modalHeaderColor : 'bar-positive',					// Optional
					modalFooterColor : 'bar-positive',					// Optional
					templateType : 'modal',								// Optional
					inputDate : today,									// Optional
					callback : function (val) {							// Mandatory
						datePickerCallbackModal(val);
					}
				};

				var datePickerCallbackModal = function (val) {
					if (typeof(val) === 'undefined') {
						console.log('No date selected');
					} else {
						$scope.dateModel = $filter('date')(val, 'yyyyMMdd');
					}
				};
			},
			link : function(scope, elem, attrs) {
				scope.$watch('dateModel', function(newValue, oldValue) {
					console.log(scope.dateModel);
				}, true);
			},
			templateUrl :'templates/directive/date-picker.html'
		};

	});