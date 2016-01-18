'use strict';

/**
 * @ngdoc function
 * @name core.services:SocketIOService
 * @description 
 *  # WebSocketIO 서비스
 */
angular.module('Elidom.Core')
    .factory('SocketIOService', function($rootScope, $ionicPopup, API_ENDPOINT) {

    var socketIO = io.connect('http://localhost:6379/');
    
    return {
        on: function (eventName, callback) {
            socketIO.on(eventName, function () {  
                var args = arguments;
                $rootScope.$apply(function () {
                    callback.apply(socketIO, args);
                });
            });
        },

        emit: function (eventName, data, callback) {
            socketIO.emit(eventName, data, function () {
                var args = arguments;
                $rootScope.$apply(function () {
                    if (callback) {
                        callback.apply(socketIO, args);
                    }
                });
            })
        }
    };

});