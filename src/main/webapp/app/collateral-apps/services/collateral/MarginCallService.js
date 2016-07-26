angular.module('DashboardApp')
    .service('MarginCallService',['$request','toastr','$q','localStorageService','md5',function ($request, toastr, $q, $localStorage,$md5) {
       
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
        	return $request.post('/servlet/MarginCallAndContract/SelectDetailById',detailParam);
        };
        this.getFile = function(url){
//        	let md5 = $md5.createHash(url);
        	$request.getFile("/servlet/File/Select/?fileMD5="+url);
        };
        this.sendIssueMarginCall = function (marginCallId,collateralLiabilityType) {
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
        };
        
        this.updateDispute  = function(dispute){
        	  return $request.post('/servlet/MarginCallAndContract/UpdateDispute/',dispute); 
        };


        //Process Margin Call Message
        this.ProcessMCMessage  = function(params){
        	  return $request.post('/servlet/Mapping/ProcessMCMessage',params);
        };

        this.getInputFilesDefinition  = function(){
        	  return $request.get('/servlet/InputFilesDefinition/SelectAll');
        };

        this.getColumnDataFormat  = function(){
        	  return $localStorage.get("ColumnDataFormat");
        };


  }]);