'use strict'
 var UserMessageCtrl = DashboardApp.controller('UserMessageController',
    ['$scope', '$rootScope', '$request', '$interval','uiGridConstants','UserMessageService', function ($scope, $rootScope, $request, $interval,uiGridConstants,UserMessage) {
    
    	$scope.$on('$includeContentLoaded', function () {
         });
    	$scope.gridUserMessages = {
    			data: [],
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
    			onRegisterApi : function(gridApi){
    			                	$scope.gridApi = gridApi;
    			}    	
    	} ;
    	
    	$scope.messageContent  = {} ;
    	$scope.viewMessage = function(entity){
    		$scope.messageContent  =  entity;	
    	};
    	$scope.messagesList = [];
    	$scope.getNewMessages = function(){
 	    		if($scope.gridUserMessagesData.length==0){
 	    			UserMessage.getByDate(moment().format("YYYY-MM-DD")).success(function(data){
 	    				$scope.gridUserMessagesData = data.dataResponse;
 	    			});
 	    		}else{
 	    				$scope.gridUserMessages.data = $scope.gridUserMessagesData;
 	    		}
    	};
    	$scope.getNewMessages();
    	   $scope.$watchCollection("$parent.gridUserMessagesData",function(nV,oV){
           	if(nV===oV){
           		return false; 
           	}
           	$scope.gridUserMessages.data = nV;
           	$scope.gridApi.core.refresh();
       		$scope.gridApi.core.notifyDataChange( uiGridConstants.dataChange.EDIT);
           });
}]);