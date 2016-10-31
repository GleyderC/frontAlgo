'use strict';

angular.module('CollateralApp').controller('NotificationsController', ['$scope','UserMessageService', function ($scope,UserMessage) {
		$scope.unReadMessages = [];
		UserMessage.getByDate(moment().format("YYYY-MM-DD")).success(function(data){
			$scope.unReadMessages =  data.dataResponse; 
			$scope.qtyMessages =   $scope.unReadMessages.length;
		});
		
}]);
	