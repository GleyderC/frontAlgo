angular.module('DashboardApp')
    .service('IntegrationService', ['$request', 'toastr', function ($request, toastr) {

        this.getAll = function () {
            return $request.get('/servlet/Integration/SelectAll');
        }

    }]);