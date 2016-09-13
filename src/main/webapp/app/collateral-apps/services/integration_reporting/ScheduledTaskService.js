angular.module('DashboardApp')
    .service('ScheduledTaskService', ['$request', 'toastr', function ($request, toastr) {

        this.getAll = function () {
            return $request.get('/servlet/ScheduledTask/SelectAll');
        }

    }]);