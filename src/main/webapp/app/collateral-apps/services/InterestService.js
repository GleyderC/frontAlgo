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
      this.getByCollateralContract = function(collateralContractId){
      		var param = {
            		id: collateralContractId
            };
      		return $request.get('/servlet/SelectByCollateralContractId',param);
      };
    

  }]);