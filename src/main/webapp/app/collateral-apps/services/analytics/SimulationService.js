angular.module('DashboardApp')
    .service('SimulationService', ['$request', 'toastr', function ($request, toastr) {
        var simulation = {};

        this.getAllTest = function () {
            return $request.get('/servlet/WhatIfSimulationTest/getAllTest');
        }

        this.RunTest = function (testObject) {

            $request.post('/servlet/WhatIfSimulationTest/StartSimulation', testObject)
                .then(function (Response) {
                        toastr.success("Successfully Run Test ", "Success");
                    }
                );
            
        }
    }]);