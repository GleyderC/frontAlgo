angular.module('DashboardApp')
    .service('SecurityService', ['$request', 'toastr', function ($request, toastr) {
        var Security = {};

        var legalEntities = [];

        this.getAll = function () {
            return $request.get('/servlet/Security/SelectAll');
        }

    }]);