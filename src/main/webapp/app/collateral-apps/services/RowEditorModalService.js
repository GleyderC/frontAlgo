angular.module('DashboardApp')
    .factory('RowEditorModalService', ['$uibModal', function ($uibModal) {
        var service = {};
        service.editRow = editRow;

        service.templateUrl = '';
        service.controller = function($scope, $uibModalInstance, grid, row) {

            $scope.entity = angular.copy(row.entity);

            $scope.save = save;

            function save() {
                if (row.entity.id === -1) {
                    row.entity = angular.extend(row.entity, $scope.entity);
                    //real ID come back from response after the save in DB
                    row.entity.id = Math.floor(100 + Math.random() * 1000);
                    grid.data.push(row.entity);

                }
                else {
                    row.entity = angular.extend(row.entity, $scope.entity);
                }

                $uibModalInstance.close();
            }

        };

        function editRow(grid, row) {
            $uibModal.open({
                templateUrl: service.templateUrl,
                size: 'lg',
                backdrop: false,
                controller: ['$scope', '$uibModalInstance', 'grid', 'row', service.controller],
                controllerAs: 'vm',
                resolve: {
                    grid: function () {
                        return grid;
                    },
                    row: function () {
                        return row;
                    }
                }
            });

        }

        return service;
    }]);