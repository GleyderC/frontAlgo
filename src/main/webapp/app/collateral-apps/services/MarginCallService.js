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
            console.log(marginCallId);
        	var  detailParam = {
        			id : marginCallId 
        	};
        	return $request.post('/servlet/MarginCallAndContract/SelectDetailById',detailParam);
        };

        this.sendIssueMarginCall = function (marginCallId) {

            var MarginSent = false;
            var params = {

                "id": marginCallId
            };

            $request.get('/servlet/MarginCall/ActionIssueMarginCall/')
                .then(function (Response) {

                    //MarginSent = true;
                    toastr.success("Margin Call Issuance Sent by e-mail ","Success")
                });
            //return MarginSent;
        }
    

  }]);