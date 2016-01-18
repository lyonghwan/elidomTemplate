'use strict';

/**
 * @ngdoc function
 * @name core.services:WebSocketService
 * @description 
 *  # WebSocket 서비스
 */
angular.module('Elidom.Core')
    .factory('WebSocketService', function($rootScope, $ionicPopup, API_ENDPOINT) {

    var ws = null, connected = false;
    
    return {
        isConnected : function() {
            return connected;
        },

        connect : function(url) {
            var realUrl = url[0] == '/' ? url : '/' + url;
            ws = new WebSocket('ws://' + API_ENDPOINT.host + ':' + API_ENDPOINT.port + realUrl);

            ws.onopen = function () {
                connected = true;
                $rootScope.$emit('websocket.opened', url);
            };
            
            ws.onmessage = function (event) {
                $rootScope.$emit('websocket.onmessage', { data : event.data, wsUrl : url });
            };
            
            ws.onclose = function () {
                connected = false;
                $rootScope.$emit('websocket.closed', url);
            };
        },

        disconnect : function() {
            if (ws != null) {
                ws.close();
                ws = null;
            }

            connected = false;
        },

        send : function(message) {
            if(ws != null)
                ws.send(message);
        }
    };
});