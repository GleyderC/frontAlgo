angular.module('DashboardApp')
    .service('InterestService',['$request','toastr',function ($request,toastr) {
        this.getAll = function(){
            return $request.get('/servlet/MarginCall/SelectAll');
        };
        this.getByDate = function(date){
        	var dateParam = {
            		date:date
            };
        	return $request.get('/servlet/Interest/SelectByDate',dateParam);
        };
      this.getByCollateralContract = function(date,collateralContractId){
      		var param = {
            		id: collateralContractId,
            		date:date
            };
      		return $request.post('/servlet/Interest/SelectByCollateralContractId',param);
      };
      this.getByDateAndCollateralContractId = function(date,contractId){
    	  var param =  {
    			  date : date,
    			  contractId : contractId
    	  };
    	  return $request.post('/servlet/Interest/SelectInterestAndContractBydateAndContractId',param);
    	  
      },
      this.getInterest  = function(){
    	  var param =  {
    			  date : date,
    			  contractId : contractId
    	  };
    	  return $request.post('/servlet/Interest/SelectInterestAndContractBydateAndContractIdAndCurrencyAndLiabilityType ',param);
    	  
      };
  }]);