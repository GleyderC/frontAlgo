'use strict'
 var UserMessageCtrl = DashboardApp.controller('UserMessageController',
    ['$scope', '$request', '$interval','uiGridConstants','UserMessageService', function ($scope, $request, $interval,uiGridConstants,UserMessage) {
    
    	$scope.$on('$includeContentLoaded', function () {
         });
    	$scope.messagesList = [];
    	UserMessage.getByDate(moment().format("YYYY-MM-DD")).success(function(data){
    		$scope.messagesList	   = data.dataResponse;
    	});
}]);