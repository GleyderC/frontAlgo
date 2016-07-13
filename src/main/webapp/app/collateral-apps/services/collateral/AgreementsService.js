angular.module('DashboardApp')
    .service('AgreementsService',['$q','$request','toastr',function ($q,$request,toastr) {
        var defered =  $q.defer();
        var promise = defered.promise;
        this.getAll = function(){
            return $request.get('/servlet/CollateralContract/SelectAll');
        }
    
  }]);