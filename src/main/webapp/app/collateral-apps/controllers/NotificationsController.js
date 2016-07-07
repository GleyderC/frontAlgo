'use strict';

angular.module('CollateralApp').controller('NotificationsController', ['$rootScope','UserMessageService', function ($rootScope,UserMessage) {
		$rootScope.unReadMessages = [];
		UserMessage.getByDate(moment().format("YYYY-MM-DD")).success(function(data){
			$rootScope.unReadMessages =  data.dataResponse; 
			$rootScope.qtyMessages =   $rootScope.unReadMessages.length;
		});
		
}]);
	