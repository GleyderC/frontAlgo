'use strict'
 var UserMessageCtrl = DashboardApp.controller('UserMessageController',
    ['$scope', '$rootScope', '$request', '$interval','uiGridConstants','UserMessageService', function ($scope, $rootScope, $request, $interval,uiGridConstants,UserMessage) {
    
    	$scope.$on('$includeContentLoaded', function () {
         });
    	$rootScope.gridUserMessages = {
    			columnDefs : [
				{ 	name:"From",
					field : "hasBeenSentByEmail"
				},
				{ name: "Title ", 
					field : "messageContentBasic"},
				{
					name :"Action",
					cellTemplate : "<div class='text-center' > <button class='btn btn-sm btn-primary uigrid-btn'  ng-click='grid.appScope.viewMessage(row.entity)'> <i class='fa fa-eye'></i></button></div>"
						
				}
    			          ],
    	} ;
    	
    	$rootScope.messageContent  = {} ;
    	$rootScope.viewMessage = function(entity){
    		$rootScope.messageContent  =  entity;	
    	};
    	$rootScope.messagesList = [];
    	
    	$rootScope.getNewMessages = function(){
 	    	UserMessage.getByDate(moment().format("YYYY-MM-DD")).success(function(data){
 	    		$rootScope.messagesList	   = data.dataResponse;
 	    		$rootScope.gridUserMessages.data = data.dataResponse ;
	    	});
    	};
    	$rootScope.getNewMessages();
    
}]);