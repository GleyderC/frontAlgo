'use-strict'
angular.module('CollateralApp').
    service('stompService',['$rootScope','$interval','$q','URL_CONFIG', function($rootScope,$interval,$q,URL_CONFIG) {

        var service = {}, listener = $q.defer(), socket = {
            client: null,
            stomp: null
          };
          
          service.RECONNECT_TIMEOUT = URL_CONFIG.RECONNECT_TIMEOUT;
          service.SOCKET_URL =  URL_CONFIG.SOCKET_URL;
          service.WS_TOPIC = URL_CONFIG.WS_TOPIC;
          service.WS_BROKER = URL_CONFIG.WS_BROKER;
          
          service.receive = function() {
            return listener.promise;
          };
          
          service.send = function(message) {
            socket.stomp.send(service.WS_BROKER, {
              priority: 0
            }, JSON.stringify({
              message: message
            }));
          };

    	var reconnect = function() {
    	      $timeout(function() {
    	        initialize();
    	      }, this.RECONNECT_TIMEOUT);
    	    };
    	    
    	    var getMessage = function(data) {
    	      var message = JSON.parse(data);
    	      return message;
    	    };
    	    
    	    var startListener = function() {
    	      socket.stomp.subscribe(service.WS_TOPIC, function(data) {
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
    }]
  );

