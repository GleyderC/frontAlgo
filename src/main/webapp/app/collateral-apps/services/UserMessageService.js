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
        
      
    
  }]);