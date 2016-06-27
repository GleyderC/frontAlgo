'use strict';
angular.module('DashboardApp')
    .service('UserMessageService',['$q','$request','toastr',function ($q,$request,toastr) {
        var defered =  $q.defer();
        var promise = defered.promise;
        this.getAll = function(){
            return $request.get('/servlet/CollateralContract/SelectAll');
        };
        this.getByDate = function(date){
            	let param = {
            			date :date
            	};
                return $request.get('/servlet/UserMessages/SelectByDate',param);
        };
        this.create = function(data){
        	var params = data; 
//        	{ "hasBeenRead" : false , 
//        		"messageContentBasic" : "Basic Content Message 123 ",
//        		"messageContentExtendes": "Extended Content Message 3232",
//        		"hasBeenSentByEmail":false, 
//        		"UserMessageType":"INTEREST_STATEMENT_CORRECTED"}
            return $request.post('/servlet/UserMessages/Insert',params);
        }
      
    
  }]);