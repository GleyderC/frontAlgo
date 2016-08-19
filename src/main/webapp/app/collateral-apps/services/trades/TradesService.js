angular.module('DashboardApp')
    .service('TradesService', ['$request', 'toastr', function ($request, toastr) {
        var Trades = {};

        this.InsertTrade = function (fpml_string) {
            //console.log(fpml_string);
            return $request.post('/servlet/Fpml/InsertTrade', fpml_string);
        }

    }]);