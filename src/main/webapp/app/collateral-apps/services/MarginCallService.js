angular.module('DashboardApp')
    .service('MarginCallService',['$request','toastr',function ($request,toastr) {
       
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
        	return $request.get('/servlet/MarginCallAndContract/SelectDetailById',detailParam);
        };
    

  }]);