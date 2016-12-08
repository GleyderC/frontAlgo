'use strict'
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
        this.sendIssueMarginCall = function (marginCallId, collateralLiabilityType, action) {
            let params = {

                "marginCallId": marginCallId,
                "collateralLiabilityType": collateralLiabilityType
            };
            //console.log(params);
            let result = '';

            if(action == 'ActionIssueMarginCall'){
                result = $request.post('/servlet/MarginCall/ActionIssueMarginCall/',params)
                    .then(function (Response) {
                    	let MarginSent = "sent";
                        toastr.success("Message Sent","Success");
                        return Response;
                    });
            }
            else if(action == 'ActionIssueDispute'){
                result = $request.post('/servlet/MarginCall/ActionIssueDispute/',params)
                    .then(function (Response) {
                        let MarginSent = "sent";
                        toastr.success("Message Sent","Success");
                        return Response;
                    });
            }
            else if(action == 'ActionSendAgreeMarginCall'){
                result = $request.post('/servlet/MarginCall/ActionSendAgreeMarginCall/',params)
                    .then(function (Response) {
                    	let MarginSent = "sent";
                        toastr.success("Message Sent","Success");
                        return Response;
                    });
            }
            else if(action == 'SendAllocationProposal'){
                result = $request.post('/servlet/MarginCall/SendAllocationProposal/',params)
                    .then(function (Response) {
                    	let MarginSent = "sent";
                        toastr.success("Message Sent","Success");
                        return Response;
                    });
            }
            else if(action == 'SendRejectAllocationProposal'){
                result = $request.post('/servlet/MarginCall/SendRejectAllocationProposal/',params)
                    .then(function (Response) {
                    	let MarginSent = "sent";
                        toastr.success("Message Sent","Success");
                        return Response;
                    });
            }
            else if(action == 'SendAgreeAllocationProposal'){
                result = $request.post('/servlet/MarginCall/SendAgreeAllocationProposal/',params)
                    .then(function (Response) {
                    	let MarginSent = "sent";
                        toastr.success("Message Sent","Success");
                        return Response;
                    });
            }
            else if(action == 'SendToBackOffice'){
                result = $request.post('/servlet/MarginCall/SendToBackOffice/',params)
                    .then(function (Response) {
                    	let MarginSent = "sent";
                        toastr.success("Message Sent","Success");
                        return Response;
                    });
            }

            return result;
        };
        
        this.updateDispute  = function(dispute){
        	  return $request.post('/servlet/MarginCallAndContract/UpdateDispute/',dispute);
        };

        /*MarginCallService.getMCMessages().then(function (Response){

         let msgs = Response.data.dataResponse.marginCall.messages;

         if( angular.isArray(msgs) && msgs.length > 0 )
         {
         angular.forEach( msgs, function( msg ){

         msg.date.dateMessage = new Date(msg.date.iMillis);
         $scope.gridMessagesOptions.data.push(msg);

         });
         }

         });*/
        //Processing Margin Call Message
        this.getMCMessages = function (){

            return $request.post('/servlet/MarginCall/NextMarginCall', { id: 1 } ).then(function (Response) {

                return $request.post('/servlet/MarginCallAndContract/SelectDetailById', { id: Response.data.dataResponse.id });

            });

        }

        this.ProcessMCMessage  = function(params){
        	  return $request.post('/servlet/Mapping/ProcessMCMessage',params);
        };

        this.SaveMappingDefinitionByUser  = function(params){
        	  return $request.post('/servlet/Mapping/SaveMappingDefinitionByUser',params);
        };

        this.SaveMappingDefinition  = function(params){
            return $request.post('/servlet/Mapping/SaveMappingDefinitionByContract',params);
        };

        this.getInputFilesDefinition  = function(){
        	  return $request.get('/servlet/InputFilesDefinition/SelectAll');
        };

        this.getColumnDataFormat  = function(){
        	  return $localStorage.get("ColumnDataFormat");
        };


  }]);