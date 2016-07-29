angular.module('DashboardApp')
    .service('SecurityService', ['$request', 'toastr', function ($request, toastr) {

        this.getAll = function () {
            return $request.get('/servlet/Security/SelectAll');
        }

    }]);