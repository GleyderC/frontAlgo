'use strict';

var DashboardApp = angular.module('DashboardApp');


DashboardApp.controller('TradesController', ['$scope',
    'localStorageService', 'uiGridConstants', 'ModalService',
    function ($scope, localStorageService, uiGridConstants, ModalService) {
        
        $scope.TradesUpload = function () {

            ModalService.open({
                templateUrl: "modalUploadTradesFile.html",
                size: 'lg',
                rendered: function () {
                    App.initComponents();
                },
                //controllerAs: 'MCUploadTrade',
                controller: function (toastr, $scope, $uibModalInstance, $sanitize, Upload, $timeout, URL_CONFIG) {

                    $scope.$watch('files', function (newVal) {
                        $scope.upload($scope.files);
                    });

                    $scope.log = '';

                    $scope.upload = function (file) {

                        if (file) {

                            if (!file.$error) {
                                Upload.upload({
                                    url: URL_CONFIG.API_URL + '/servlet/Fpml/InsertTrade',
                                    headers : {
                                        'Content-Type': file.type,
                                        'file-name': file.name
                                    },
                                    data: {
                                        file: file
                                    }
                                }).then(function (resp) {
                                    $timeout(function () {
                                        console.log(resp);
                                        $scope.log = 'file: ' +
                                            resp.config.data.file.name +
                                            ', Response: ' + JSON.stringify(resp.data) +
                                            '\n' + $scope.log;
                                    });

                                    toastr.success("File Uploaded", "Success:");

                                }, null, function (evt) {
                                    var progressPercentage = parseInt(100.0 *
                                        evt.loaded / evt.total);
                                    $scope.log = 'progress: ' + progressPercentage +
                                        '% ' + evt.config.data.file.name + '\n' +
                                        $scope.log;
                                });

                            }
                        }
                    };

                    $scope.cancel = function () {
                        $uibModalInstance.dismiss('cancel');
                    };

                },
                resolve: {}
            });
        }

    }]);