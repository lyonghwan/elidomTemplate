'use strict';

/**
 * @ngdoc function
 * @name core.services:WebSocketService
 * @description 
 *  # WebSocket 서비스
 */
angular.module('Elidom.Core')
    .factory('StompWebSocketService', function($rootScope, $timeout, API_ENDPOINT) {

    var service = {};
    var stompSocket = { client: null, stomp: null };
    
    service.RECONNECT_TIMEOUT = 30000;
    service.SOCKET_URL = "/elidom/stomp";
    service.COMMON_TOPIC = "/elidom/stomp/topic/**";
        
    service.send = function(url, message) {
        var msg = (typeof message === 'string' || message instanceof String) ? message : JSON.stringify(message);
        stompSocket.stomp.send(service.SOCKET_URL + '/' + url, { priority: 9 }, msg);
    };
    
    var reconnect = function() {
        $timeout(function() {
            initialize();
        }, this.RECONNECT_TIMEOUT);
    };
        
    var startListener = function() {
        stompSocket.stomp.subscribe(service.COMMON_TOPIC, function(data) {
            if(data && data.headers && data.headers.destination) {
                $rootScope.$emit(data.headers.destination, data.body);
            } else {
                $rootScope.$emit('unkown_topic', data.body);
            }
        });
    };

    var getConnectionUrl = function() {
        return API_ENDPOINT.protocol + '://' + API_ENDPOINT.host + ':' + API_ENDPOINT.port + API_ENDPOINT.path + service.SOCKET_URL;
    };
    
    service.initialize = function() {
        var sockjsUrl = getConnectionUrl();
        stompSocket.client = new SockJS(sockjsUrl);
        stompSocket.stomp = Stomp.over(stompSocket.client);
        stompSocket.stomp.connect({}, startListener);
        stompSocket.stomp.onclose = reconnect;
    };
    
    return service;
});