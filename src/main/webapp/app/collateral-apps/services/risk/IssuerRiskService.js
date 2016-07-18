angular.module('DashboardApp')
    .service('IssuerRiskService',['$request','toastr',function ($request,toastr) {
        var IssuerRisk = {};

        this.getAll = function(idLegal, counterPartyType, counterPartyId, currency){
            //console.log(counterPartyId);
            var param = {legalEntityPointOfViewId:idLegal,counterPartyType : "LE",
                counterPartyId : counterPartyId, currency: currency};

            //console.log(param);

            return $request.post('/servlet/ExposureByIssuer/SelectAll',param);
        }

    }]);