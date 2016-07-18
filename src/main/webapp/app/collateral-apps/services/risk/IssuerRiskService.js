angular.module('DashboardApp')
    .service('IssuerRiskService',['$request','toastr',function ($request,toastr) {
        var IssuerRisk = {};

        this.getAll = function(idLegal, counterPartyType, counterPartyId, currency){
            //console.log(currency);

            var param = {legalEntityPointOfViewId:idLegal,counterPartyType : counterPartyType,
                counterPartyId : counterPartyId, currency: currency};

            if(counterPartyId == 0)
                param.counterPartyType = "";

            //console.log(param);

            return $request.post('/servlet/ExposureByIssuer/SelectAll',param);
        }

    }]);