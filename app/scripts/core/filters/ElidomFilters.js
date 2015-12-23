'use strict';

/**
 * @ngdoc function
 * @name core.filters:ElidomFilter
 * @description
 * # ElidomFilter
 */
angular.module('Elidom.Core')

	// 전화번호
	.filter('telephone', function($filter) {
		return function(input) {
			if(input && input.length >= 9) {
				if(input.length == 9) {
					return input.substr(0, 2) + '-' + input.substr(2, 3) + '-' + input.substr(5);
				} else if(input.length == 10) {
					if(input.substr(0, 2) == '02') {
						return input.substr(0, 2) + '-' + input.substr(2, 4) + '-' + input.substr(6);
					} else {
						return input.substr(0, 3) + '-' + input.substr(3, 3) + '-' + input.substr(6);
					}
				} else if(input.length >= 11) {
					return input.substr(0, 3) + '-' + input.substr(3, 4) + '-' + input.substr(7);
				} else {
					return input;
				}
			} else {
				return input;
			}
		};
	})

	// 년월일 - 한글 
	.filter('date_kor', function($filter) {
		return function(input) {
			if(!input) {
				return input;
			} else {
				var ymd = "" + input;
				if(ymd && ymd.length == 8) {
					return ymd.substr(0, 4) + '년' + ymd.substr(4, 2) + '월' + ymd.substr(6) + '일';
				} else {
					return ymd;
				}				
			}
		};
	})

	// 년월일 - 하이픈(-)
	.filter('hiphen_date', function($filter) {
		return function(input, delimeter) {
			if(!input) {
				return input;
			} else {
				delimeter = delimeter ? delimeter : '-';
				var ymd = "" + input;
				if(ymd && ymd.length == 8) {
					return ymd.substr(0, 4) + delimeter + ymd.substr(4, 2) + delimeter + ymd.substr(6);
				} else {
					return ymd;
				}
			}
		};
	})

	// 괄호 
	.filter('bracket', function($filter) {
		return function(input) {
			if(!input) {
				return '';
			} else {
				return '(' + ('' + input).trim() + ')';	
			}
		};	
	})

	// 년도.월  
	.filter('year_month', function($filter) {
		return function(input, delimeter) {
			if(!input) {
				return input;

			} else {
				delimeter = delimeter ? delimeter : '.';
				var ymd = "" + input;
				if(ymd && ymd.length == 6) {
					return ymd.substr(0, 4) + delimeter + ymd.substr(4);
				} else {
					return ymd;
				}
			}
		};	
	})

	// 값이 없을 경우 0 표시
	.filter('check_empty_num', function($filter) {
		return function(input, delimeter) {
			if(input) {
				return input;
			} 
			return '0';
		};	
	})

	// empty to hiphen
	.filter('empty_to_hiphen', function($filter) {
		return function(input) {
			return (input === undefined || input === null || input === '') ? '-' : input;
		};
	});