'use strict';

/**
 * @ngdoc function
 * @name collateralApp.controller:MenuCtrl
 * @description
 * # MenuCtrl
 * Controller of the collateralApp
 */

angular.module('CollateralApp')

    .controller('LoginController', ['$scope', 'toastr', '$state', 'localStorageService', '$http', 'URL_CONFIG', function ($scope, toastr, $state, localStorage, $http, URL_CONFIG) {

        $scope.lockForm = false;
        localStorage.set("CMS-AuthorizationToken","");

        $scope.attemptLogin = function () {

            $scope.lockForm = true;

            $http({
                method: "POST",
                url: URL_CONFIG.SERVICE_LOGIN_URL + "/login",
                data: {
                    username: $scope.username,
                    password: $scope.password
                }
            })
                .then(function (response) {

                    if( response.data.authenticated == true )
                    {

                        localStorage.set("CMS-AuthorizationToken", response.data.credentials);

                        toastr.success('Welcome <b>'+ $scope.username + "</b>", {
                            allowHtml: true,
                            timeOut: 3000,
                            onHidden: function(){
                                $state.go("home")
                            }
                        });

                    }
                    else
                    {
                        $scope.username = "";
                        $scope.password = "";
                        angular.element("#username").focus();
                        toastr.error('Invalid User or Password');
                        $scope.lockForm = false;
                    }

                }, function (response) {
                    $scope.username = "";
                    $scope.password = "";
                    angular.element("#username").focus();
                    toastr.error('There was an error attempting to login');
                    $scope.lockForm = false;
                });

        };


    }]);
