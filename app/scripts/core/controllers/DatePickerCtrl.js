'use strict';

/**
 * @ngdoc function
 * @name core.controller:DatePickerCtrl
 * @description
 * # DatePickerCtrl
 */
angular.module('Elidom.Core')
  .controller('DatePickerCtrl', function($scope, $filter) {

    var disabledDates = [
      new Date(1437719836326),
      new Date(2015, 7, 10), //months are 0-based, this is August, 10th!
      new Date('Wednesday, August 12, 2015'), //Works with any valid Date formats like long format
      new Date("08-14-2015"), //Short format
      new Date(1439676000000) //UNIX format
    ];

    var monthList = ["Jan", "Feb", "March", "April", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];
    var today = new Date();
    $scope.inputDate =$filter('date')(today, 'yyyyMMdd');

    $scope.datepickerObjectModal = {
      setButtonType : 'button-assertive', //Optional
      modalHeaderColor:'bar-positive', //Optional
      modalFooterColor:'bar-positive', //Optional
      templateType:'modal', //Optional
      inputDate: today, //Optional
      callback: function (val) { //Mandatory
        datePickerCallbackModal(val);
      }
    };

    // $scope.datepickerObject = {
    //   titleLabel: 'Ionic-Datepicker', //Optional
    //   todayLabel: 'Today', //Optional
    //   closeLabel: 'Close', //Optional
    //   setLabel: 'Set', //Optional
    //   errorMsgLabel : 'Please select time.', //Optional
    //   setButtonType : 'button-assertive', //Optional
    //   modalHeaderColor:'bar-positive', //Optional
    //   modalFooterColor:'bar-positive', //Optional
    //   templateType:'popup', //Optional modal
    //   inputDate: today, //Optional
    //   mondayFirst: true, //Optional
    //   disabledDates:disabledDates, //Optional
    //   monthList:monthList, //Optional
    //   from: new Date(2014, 5, 1), //Optional
    //   to: new Date(2016, 7, 1), //Optional
    //   callback: function (val) { //Optional
    //     datePickerCallbackPopup(val);
    //   }
    // };

    var datePickerCallbackModal = function (val) {
      if (typeof(val) === 'undefined') {
        console.log('No date selected');
      } else {
        $scope.inputDate = $filter('date')(val, 'yyyyMMdd');
        console.log('Selected date is : ', val);
        // console.log('Selected date showing : ',$scope.inputDate);
      }
    };
    
  });