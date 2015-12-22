'use strict';

angular.module('ElidomTemplate')
	// 기업형태 색상 
	.filter('type_color', function($filter) {
		return function(input) {
			if(input) {
				input = input.trim();
				// type1 : 주황, type2 : 노랑색, type3 : 초록, type4 : 에메랄드, type5 : 파랑 , type6 : 청록, type7 : 보라, type8: 회색, type9: 노랑, type10: 고동, type111: 갈색 
				if(input == '1') {
					return 'type2';				// 상장, 빨강 - type2
				} else if(input == '3') {
					return 'type3';				// 코스닥, 초록 - type3
				} else if(input == '4') {
					return 'type9';				// 외감, 노랑색 - type9
				} else if(input == '5') {
					return 'type1';				// 일반, 주황 - type1
				} else if(input == '6') {
					return 'type10';			// 피합병, 고동 - type10
				} else if(input == '7') {
					return 'type8';				// 휴폐업, 회색 - type8
				} else if(input == '8') {
					return 'type7';				// 개인, 보라 - type7
				} else if(input == '9') {
					return 'type11';			// 지사, 갈색 - type11 
				} else if(input == '12') {
					return 'type5';				// 코넥스, 청록 - type6
				} else {
					return input;
				}
			} else {
				return input;
			}
		};
	})	

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