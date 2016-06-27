angular.module('DashboardApp')
    .service('MarginCallService',['$request','toastr','$q',function ($request, toastr, $q) {
       
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
            //console.log(marginCallId);
        	var  detailParam = {
        			id : marginCallId 
        	};
        	return $request.post('/servlet/MarginCallAndContract/SelectDetailById',detailParam);
        };

        this.sendIssueMarginCall = function (marginCallId,collateralLiabilityType) {

            //console.log(marginCallId);
            var MarginSent = "";
            var defered = $q.defer();
            var promise = defered.promise;

            var params = {

                "marginCallId": marginCallId,
                "collateralLiabilityType": collateralLiabilityType
            };

            $request.post('/servlet/MarginCall/ActionIssueMarginCall/',params)
                .then(function (Response) {
                    MarginSent = "sent";
                    toastr.success("Margin Call Issuance Sent by e-mail ","Success");
                    defered.resolve(MarginSent);
                },
                function (error) {
                    defered.reject(error);
                });


            return promise;
        }
    

  }]);