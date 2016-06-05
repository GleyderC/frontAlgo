angular.module('DashboardApp')
    .service('ModalService', ['$uibModal', '$log', function ($uibModal, $log) {

        var ModalService = {};
        var modalInstance = null;
        ModalService.Options = {
            templateUrl: null,
            controller: function(){},
            animationsEnabled: true,
            size: 'md',
            opened: function(){},
            closed: function(){},
            rendered: function(){},
            resolve: {}
        };

        ModalService.open = function () {

            if(!ModalService.Options.templateUrl){
                console.log("Select a templateUrl to render please");
                return false;
            }

            console.log("***")
            console.log(ModalService.Options.resolve)
            console.log("***")
            modalInstance = $uibModal.open({
                animation: ModalService.Options.animationsEnabled,
                templateUrl: ModalService.Options.templateUrl,
                controller: ModalService.Options.controller,
                controllerAs: ModalService.Options.controllerAlias,
                size: ModalService.Options.size,
                resolve: ModalService.Options.resolve
            });

            modalInstance.result.then(function (selectedItem) {
                ModalService.selected = selectedItem;
            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });

            modalInstance.opened.then(ModalService.Options.opened);

            modalInstance.closed.then(ModalService.Options.closed);

            modalInstance.rendered.then(ModalService.Options.rendered);

        };

        ModalService.close = function () {
            modalInstance.dismiss('cancel');
        };

        ModalService.toggleAnimation = function () {
            ModalService.animationsEnabled = !ModalService.animationsEnabled;
        };

        return ModalService;

    }]);