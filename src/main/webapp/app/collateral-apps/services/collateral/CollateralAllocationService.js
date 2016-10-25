'use strict'
angular.module('DashboardApp')
    .service('CollateralAllocationService',['$request','toastr','$q','localStorageService','md5',function ($request, toastr, $q, $localStorage,$md5) {
       
        this.saveAllocation = function(allocation){
            
            return $request.post('/servlet/CollateralAllocation/SaveAllocation',allocation);
        };
        this.sendAllocationProposal = function(allocation){
        	return $request.post('/servlet/CollateralAllocation/SendAllocationProposal',allocation);
        };


  }]);