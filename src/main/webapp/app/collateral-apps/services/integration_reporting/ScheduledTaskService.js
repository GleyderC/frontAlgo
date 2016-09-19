'use strict'
angular.module('DashboardApp')
    .service('ScheduledTaskService', ['$request', 'toastr', function ($request, toastr) {

        this.getAll = function () {
            return $request.get('/servlet/ScheduledTask/SelectAll');
        }

        this.runTask = function (idTask){

            let param = {id: idTask};
            let result = $request.post('/servlet/ScheduledTask/ExecuteTaskManually',param).then(function (Task) {

                toastr.success("Task successfully ran", "Success");
                return Task;
            });
            return result;
        }

    }]);