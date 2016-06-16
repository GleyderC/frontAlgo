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
        this.sendIssueMarginCall = function (marginCallId) {
            var params = {

                "id": marginCallId
            };

            $request.get('/servlet/MarginCall/ActionIssueMarginCall/')

                .then(function (Response) {

                    toastr.success("Margin Call Send!","Success")
                });
        }
    

  }]);