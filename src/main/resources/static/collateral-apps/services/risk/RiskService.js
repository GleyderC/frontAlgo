angular.module('DashboardApp')
    .service('RiskService',['$request','toastr',function ($request,toastr) {
        var IssuerRisk = {};

        this.getExposureByIssuer = function(idLegal, counterPartyType, counterPartyId, currency){
            //console.log(currency);

            var param = {legalEntityPointOfViewId:idLegal,counterPartyType : counterPartyType,
                counterPartyId : counterPartyId, currency: currency};

            if(counterPartyId == 0)
                param.counterPartyType = "";

            //console.log(param);

            return $request.post('/servlet/ExposureByIssuer/SelectAll',param);
        }

        this.getExposureByCountry = function(idLegal, counterPartyType, counterPartyId, currency,
                                             showSovereign, showPublic, showCorporate){
            //console.log(showSovereign, showPublic, showCorporate);

            var param = {legalEntityPointOfViewId:idLegal,counterPartyType : counterPartyType,
                counterPartyId : counterPartyId, currency: currency, showSovereign: showSovereign,
                showPublic: showPublic, showCorporate: showCorporate};

            if(counterPartyId == 0)
                param.counterPartyType = "";

            //console.log(param);

            return $request.post('/servlet/ExposureByCountry/SelectAll',param);
        }

    }]);