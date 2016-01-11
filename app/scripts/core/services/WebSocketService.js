'use strict';

/**
 * @ngdoc function
 * @name core.services:WebSocketService
 * @description 
 *  # WebSocket 서비스
 */
angular.module('Elidom.Core')
    .factory('WebSocketService', function($q, $timeout) {

    var service = {};
    var listener = $q.defer();
    var socket = { client: null, stomp: null };
    var messageIds = [];
    
    service.RECONNECT_TIMEOUT = 30000;
    service.SOCKET_URL = "/";
    service.CHAT_TOPIC = "/elidom/topic";
    
    service.receive = function() {
        return listener.promise;
    };
    
    service.send = function(url, message) {
        var id = Math.floor(Math.random() * 1000000);
        socket.stomp.send(url, {
            priority: 9
        }, JSON.stringify({
            message: message,
            id: id
        }));
        messageIds.push(id);
    };
    
    var reconnect = function() {
        $timeout(function() {
            initialize();
        }, this.RECONNECT_TIMEOUT);
    };
    
    var getMessage = function(data) {
        var message = JSON.parse(data), out = {};
        out.message = message.message;
        out.time = new Date(message.time);
        if (_.contains(messageIds, message.id)) {
            out.self = true;
            messageIds = _.remove(messageIds, message.id);
        }
        
        return out;
    };
    
    var startListener = function() {
        alert('Connected');
        socket.stomp.subscribe(service.CHAT_TOPIC, function(data) {
            listener.notify(getMessage(data.body));
        });
    };
    
    var initialize = function() {
      socket.client = new SockJS(service.SOCKET_URL);
      socket.stomp = Stomp.over(socket.client);
      socket.stomp.connect({}, startListener);
      socket.stomp.onclose = reconnect;
    };
    
    initialize();
    return service;

});