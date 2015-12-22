'use strict';

angular.module('ElidomTemplate')
	.factory('ElidomUtils', function($window, $ionicPopup, $filter) {
	
	return {
		/**
		 * 기간 조건 
		 */
		getMonthPeriod : function(monthDuration) {
			var toMonthIdx = 0, fromMonthIdx = -1 * monthDuration;
			var toDate = new Date(), fromDate = new Date();
			toDate.setMonth(toDate.getMonth() + toMonthIdx);
			fromDate.setMonth(fromDate.getMonth() + fromMonthIdx);
			return { start_date : fromDate, end_date : toDate };
		},

        /**
         * date에 add 만큼 날짜 계산 
         */
        addDate : function(date, add) {
            date.setDate(date.getDate() + add);
            return date;
        },

        /**
         * date format change
         */
        formatDate : function(date, format) {
            return $filter("date")(date, format);
        },

        /**
         * Base 64 인코딩 ...
         */
        encodeBase64 : function(input) {
			return $window.btoa(input);        	
        },

        /**
         * Check Empty
         */
        isEmpty : function(obj) {
            if(undefined === obj || null === obj || '' === obj) {
                return true;
            } else {
                return false;
            }
        }

		//------------------------------- E N D ------------------------------------
	};
});