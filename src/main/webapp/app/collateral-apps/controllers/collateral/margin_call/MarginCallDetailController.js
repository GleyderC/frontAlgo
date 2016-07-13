'use strict';

var DashboardApp = angular.module('DashboardApp');

DashboardApp.controller('MarginCallDetailController', ['$scope','localStorageService', 'uiGridConstants', 'MarginCallService','$timeout',
    function ($scope, localStorage,uiGridConstants, MarginCallService, $timeout) {

        $scope.sendFlag = false;
        $scope.currentMarginCall = $scope.parameters;
        $scope.tab2Active = 2;
        $scope.post = [];
        $scope.receive = [];
        $scope.tabClicked   =function(tab){
        	if(tab.id=="mc-csa-allocations"){
        		  $scope.tabs2[0].disabled = true;
        		  $scope.tabs2[0].active = false;
        		  
        		  
        		  $scope.tabs2[1].active = true; 

        	}else{
        		  $scope.tabs2[0].disabled = false;
        	}
        };
        $scope.tabs1 = [
            {
                id: 'mc-csa-margin',
                title: 'CSA Margins',
                templateUrl: 'collateral-apps/views/collateral/margin_call/mc_csa_margin.html',
                icon: 'icon-call-in'
            },
            {
                id: 'mc-csa-allocations',
                title: 'CSA Allocations',
                templateUrl: 'collateral-apps/views/collateral/margin_call/mc_csa_allocations.html',
                icon: ''	
            },
            {
                id: 'mc-im-collateral-allocations',
                title: 'IM Collateral Allocations',
                templateUrl: 'collateral-apps/views/collateral/margin_call/mc_im_collateral_allocations.html',
                icon: ''
            },
            {
                id: 'mc-vm-collateral-allocations',
                title: 'VM Collateral Allocations',
                templateUrl: 'collateral-apps/views/collateral/margin_call/mc_vm_collateral_allocations.html',
                icon: ''
            },
            {
                id: 'mc-collateral-substitution',
                title: 'Collateral Substitution',
                templateUrl: 'collateral-apps/views/collateral/margin_call/mc_collateral_substitution.html',
                icon: ''
            },
            {
                id: 'messaging-repository',
                title: 'Messaging Repository',
                templateUrl: 'collateral-apps/views/collateral/margin_call/mc_messaging_repository.html',
                icon: ''
            }
        ];
 
        $scope.tabs2 = [
            {
                id: 'mc-trades',
                title: 'Trades (underlyings)',
                templateUrl: 'collateral-apps/views/collateral/margin_call/mc_trades.html',
                icon: '',
                active : true,
                disabled : false
            },
            {
                id: 'mc-collateral-inventory',
                title: 'Position',
                templateUrl: 'collateral-apps/views/collateral/margin_call/mc_collateral_inventory.html',
                icon: '',
                active : true
                
            },
            {
                id: 'mc-collateral-pool',
                title: 'Pool',
                templateUrl: 'collateral-apps/views/collateral/margin_call/mc_collateral_pool.html',
                icon: '',
                	active : true
            }

        ];

        $scope.Inventory = {} ;
        $scope.threshold = 0;
        $scope.minimumTransferAmount = 0;
        $scope.marginCallType  = "";
         $scope.callAmount      = "" ;
        $scope.reCallAmount    =  "";
        
        
        
        $scope.setMarginCallType = function(marginCallType){
        	let marginTypeList = {}; 
        	$scope.marginCallType = localStorage.get("MarginCallType");
        	$scope.marginCallType.forEach(function(v,k){
        		marginTypeList[v.key] =  v.name; 
        	});
        	$scope.marginCallType =  marginTypeList[marginCallType];
        };
        $scope.setCallAmount = function(marginCallType,Amount){
        	if(marginCallType.toUpperCase().indexOf("RECALL")!=-1){
        		 $scope.reCallAmount = Amount;
        	}else{
        		 $scope.callAmount  = Amount;
        	}
        };
        MarginCallService.getDetail($scope.currentMarginCall.marginCalls[0].id).then(function (result) {
            //$scope.marginCallTrade = result.data.dataResponse.marginCall;
            $scope.Trades = result.data.dataResponse.trades;
            $scope.posted 	= result.data.dataResponse.postedCollateral;
            $scope.received = result.data.dataResponse.receivedCollateral;
            $scope.Messages = result.data.dataResponse.marginCall.messages;
            $scope.MarginCallDetail = result.data.dataResponse;
            $scope.Inventory  =  $scope.posted.concat($scope.received);
            $scope.pool  =  result.data.dataResponse.poolDisplays;
            
			$scope.setMarginCallType($scope.MarginCallDetail.marginCall.marginCallElementsByLiabilityType.CSA.marginCallCalculations.marginCallType);
			
			$scope.setCallAmount($scope.MarginCallDetail.marginCall.marginCallElementsByLiabilityType.CSA.marginCallCalculations.marginCallType,$scope.MarginCallDetail.marginCall.marginCallElementsByLiabilityType.CSA.marginCallCalculations.marginCallAmount);

			$scope.setMarginCallType($scope.MarginCallDetail.marginCall.marginCallElementsByLiabilityType.CSA.marginCallCalculations.marginCallType);
            if($scope.MarginCallDetail.marginCall.marginCallElementsByLiabilityType.CSA.marginCallCalculations.exposurePlusNettedIa > 0 ){
            	$scope.threshold  = $scope.MarginCallDetail.contract.partyBThreshold;
            	$scope.minimumTransferAmount = $scope.MarginCallDetail.contract.minimumTransferAmountPartyB; 
            	
            }else{
            	$scope.threshold  = $scope.MarginCallDetail.contract.partyAThreshold;
            	$scope.minimumTransferAmount = $scope.MarginCallDetail.contract.minimumTransferAmountPartyA; 
            }
        });
        this.sendMargin = function () {
            $scope.sendFlag = true;
            //console.log($scope.sendFlag);
            var result = MarginCallService.sendIssueMarginCall($scope.MarginCallDetail.marginCall.id, "CSA").
                then(function (result) {
                    //console.log(result);
                    $scope.sendFlag = false;
            },
                function (error) {
                    console.error(error);
                    $scope.sendFlag = false;
                });

        }
    }]);
