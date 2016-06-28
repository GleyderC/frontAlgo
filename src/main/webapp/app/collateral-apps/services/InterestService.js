angular.module('DashboardApp')
    .service('InterestService',['$request','toastr',function ($request,toastr) {
        this.getAll = function(){
            return $request.get('/servlet/MarginCall/SelectAll');
        };
        this.getByDate = function(date){
        	var dateParam = {
            		date:date
            };
        	return $request.get('/servlet/Interest/SelectAllByDate',dateParam);
        };
      this.getByCollateralContract = function(collateralContractId){
      		var param = {
            		id: collateralContractId
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
      this.getInterest  = function(date,contractId,currency,collateralLbtyType){
    	  var param =  {
    			  date : date,
    			  contractId : contractId,
    			  currency : currency,
    			  collateralLiabilityType : collateralLbtyType
    	  };
    	  return $request.post('/servlet/Interest/SelectInterestAndContractBydateAndContractIdAndCurrencyAndLiabilityType ',param);
    	  
      };
  }]);