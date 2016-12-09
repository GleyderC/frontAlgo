angular.module('DashboardApp')
    .service('TradeQueryService', ['$request', 'toastr', function ($request, toastr) {

        this.getAll = function () {
            return $request.get('/servlet/TradeQuery/SelectAll');
        }
        
    }]);