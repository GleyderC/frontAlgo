angular.module('DashboardApp')
    .service('UsersService', ['$request', 'toastr', function ($request, toastr) {
        var Users = {};

        this.getAll = function () {
            return $request.get('/servlet/User/SelectAll');
        }

    }]);