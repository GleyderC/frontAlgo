'use strict';

var DashboardApp = angular.module('DashboardApp')

DashboardApp.controller('UserProfileController', ['ModalService', '$scope', function (ModalService, $scope) {

    var _that = this;

    this.modalChangePass = function(){
        ModalService.open({
            templateUrl: "modalChangePassword.html",
            size: 'md',
            rendered: function () {
                App.initComponents();
            },
            controller: function (toastr, $scope, $uibModalInstance) {
                
                $scope.save = function () {
                    //console.log("Press Ok")
                    $uibModalInstance.close();
                };

                $scope.cancel = function () {
                    $uibModalInstance.dismiss('cancel');
                };
            }
        });
    };

    $scope.editRow = function (grid, row) {
        console.log("editing")
    }

    $scope.deleteRow = function (grid, row) {
        console.log("deleting")
    }

}]);
