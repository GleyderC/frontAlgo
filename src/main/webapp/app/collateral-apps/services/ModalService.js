angular.module('DashboardApp')
    .service('ModalService', ['$uibModal', '$log', function ($uibModal, $log) {

        var ModalService = {};
        var modalInstance = null;

        ModalService.animationsEnabled = true;

        ModalService.open = function (size) {

            modalInstance = $uibModal.open({
                animation: ModalService.animationsEnabled,
                templateUrl: paths.tpls + '/ModalTpl.html',
                controller: function ($scope, $uibModalInstance) {
                    
                    $scope.ok = function () {
                        $uibModalInstance.close($scope.selected.item);
                    };

                    $scope.cancel = function () {
                        $uibModalInstance.dismiss('cancel');
                    };

                },
                size: size,
                resolve: {
                    items: function () {
                        return [];
                    }
                }
            });

            modalInstance.result.then(function (selectedItem) {
                ModalService.selected = selectedItem;
            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });
        };

        ModalService.close = function () {
            modalInstance.dismiss('cancel');
        };

        ModalService.toggleAnimation = function () {
            ModalService.animationsEnabled = !ModalService.animationsEnabled;
        };

        return ModalService;

    }]);