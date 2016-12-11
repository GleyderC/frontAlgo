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

        $scope.attemptLogin = function () {

            $scope.lockForm = true;
            toastr.success('Welcome <b>'+ $scope.username + "</b>", {
                allowHtml: true,
                timeOut: 3000,
                onHidden: function(){
                    $state.go("home")
                }
            });

            /*
            $http({
                method: "POST",
                url: URL_CONFIG.SERVICE_LOGIN_URL + "/login",
                params: {
                    username: $scope.username,
                    password: $scope.password
                },
                headers : {'Content-Type': 'application/x-www-form-urlencoded'}
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
                    }

                }, function (response) {
                    console.error("There was an error attempting to login")
                    console.error(response)
                    $scope.lockForm = false;
                });
                */
        };


    }]);
