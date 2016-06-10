angular.module('DashboardApp')
    .service('MarginCallService',['$q','$request','toastr',function ($q,$request,toastr) {
        var defered =  $q.defer();
        var promise = defered.promise;
        this.getAll = function(){
            return $request.get('/servlet/MarginCall/SelectAll');
        };
        this.getByDate = function(date){
        	var dateParam = {
            		date:date
            };
        	return $request.get('/servlet/MarginCallAndContract/SelectByDate',dateParam);
        };
        this.getDetail = function(marginCallId){
        	var  detailParam = {
        			id : marginCallId 
        	};
        	return $request.get('/servlet/MarginCallAndContract/SelectById',detailParam);
        };
    

  }]);