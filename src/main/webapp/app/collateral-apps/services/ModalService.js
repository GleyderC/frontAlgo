'use strict';
angular.module('DashboardApp')
    .service('ModalService', ['$uibModal', '$log', function ($uibModal, $log) {

        let ModalService = {};
        let modalInstance = null;

        ModalService.open = function (Options) {

            ModalService.Options = {
                templateUrl: null,
                controller: function(){},
                controllerAs: '',
                animationsEnabled: true,
                size: 'md',
                opened: function(){},
                closed: function(){},
                rendered: function(){},
                resolve: {}
            };

            if(!!Options){
                {
                    if(!!Options.animation)
                        ModalService.Options.animationsEnabled = Options.animation;

                    if(!!Options.templateUrl)
                        ModalService.Options.templateUrl = Options.templateUrl;

                    if(!!Options.controller)
                        ModalService.Options.controller = Options.controller;

                    if(!!Options.controllerAs)
                        ModalService.Options.controllerAs = Options.controllerAs;

                    if(!!Options.size)
                        ModalService.Options.size = Options.size;

                    if(!!Options.resolve)
                        ModalService.Options.resolve = Options.resolve;

                    if(!!Options.opened)
                        ModalService.Options.opened = Options.opened;

                    if(!!Options.closed)
                        ModalService.Options.closed = Options.closed;

                    if(!!Options.rendered)
                        ModalService.Options.rendered = Options.rendered;
                    
                }
            }

            if(!ModalService.Options.templateUrl){
                console.log("Select a templateUrl to render please");
                return false;
            }

            modalInstance = $uibModal.open(ModalService.Options);

            modalInstance.result.then(function (selectedItem) {
                ModalService.selected = selectedItem;
            }, function () {
                //$log.info('Modal dismissed at: ' + new Date());
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