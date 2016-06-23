angular.module('CollateralApp').controller('DashboardController',
    [
        '$rootScope',
        '$rootScope',
        '$request',
        'localStorageService',
        function ($rootScope, $scope, $request, localStorageService) {

            $scope.workspace = {
                active: 1,
                tabList: [
                    {
                        active: 1,
                        head: {
                            icon: 'glyphicon glyphicon-refresh glyphicon-refresh-animate',
                            text: 'Root Tab 1'
                        },
                        content: 'el content del tab1',
                        templateUrl: '',
                        resolve: {
                            formData: []
                        },
                        disabled: false,
                        closable: false,
                        callback: function () {
                        },
                        childWorkspace: {
                            active: 1,
                            tabList: [{
                                head: {
                                    icon: 'glyphicon glyphicon-refresh glyphicon-refresh-animate',
                                    text: 'Tab Fahter 1'
                                },
                                content: 'el content del tab1',
                                templateUrl: '',
                                resolve: {
                                    formData: []
                                },
                                disabled: false,
                                closable: true,
                                callback: function () {
                                },
                                childWorkspace: {
                                    active: 1,
                                    tabList: [{
                                        head: {
                                            icon: 'glyphicon glyphicon-refresh glyphicon-refresh-animate',
                                            text: 'Tab son of son 1'
                                        },
                                        content: 'el content del tab son of son 1',
                                        templateUrl: '',
                                        resolve: {
                                            formData: []
                                        },
                                        disabled: false,
                                        closable: false,
                                        callback: function () {
                                        },
                                        childWorkspace: {}
                                    }]
                                }
                            },
                                {
                                    active: 1,
                                    head: {
                                        icon: 'glyphicon glyphicon-refresh glyphicon-refresh-animate',
                                        text: 'Tab Father 2'
                                    },
                                    content: 'el content del tab2',
                                    templateUrl: '',
                                    resolve: {
                                        formData: []
                                    },
                                    disabled: false,
                                    closable: false,
                                    callback: function () {
                                    },
                                    childWorkspace: {
                                        active: 1,
                                        tabList: [{
                                            head: {
                                                icon: 'glyphicon glyphicon-refresh glyphicon-refresh-animate',
                                                text: 'Tab son 2'
                                            },
                                            content: 'el content del tab son 2',
                                            templateUrl: '',
                                            resolve: {
                                                formData: []
                                            },
                                            disabled: false,
                                            closable: false,
                                            callback: function () {
                                            },
                                            childWorkspace: {
                                                active: 1,
                                                tabList: [{
                                                    head: {
                                                        icon: 'glyphicon glyphicon-refresh glyphicon-refresh-animate',
                                                        text: 'Tab son of son 1'
                                                    },
                                                    content: 'el content del tab son of son 1',
                                                    templateUrl: '',
                                                    resolve: {
                                                        formData: []
                                                    },
                                                    disabled: false,
                                                    closable: false,
                                                    callback: function () {
                                                    },
                                                    childWorkspace: {}
                                                },
                                                    {
                                                        head: {
                                                            icon: 'glyphicon glyphicon-refresh glyphicon-refresh-animate',
                                                            text: 'Tab son of son 2'
                                                        },
                                                        content: 'el content del tab son of son 2',
                                                        templateUrl: paths.tpls + '',
                                                        resolve: {
                                                            formData: []
                                                        },
                                                        autoload: false,
                                                        disabled: false,
                                                        closable: true,
                                                        callback: function () {
                                                        },
                                                        childWorkspace: {}
                                                    }]
                                            }
                                        }]
                                    }
                                }]
                        }
                    }]
            }

            //GET STATIC DATA FROM THE SERVER
            $request.get("/servlet/StaticData/SelectAll").then(function (response) {
                angular.forEach(response.data.dataResponse, function (obj, key) {
                    localStorageService.set(obj.type, obj.value);
                });
            });

            $scope.$on('$includeContentLoaded', function () {
                App.initAjax();
                $(".go2top").show();
            });

            // set sidebar closed and body solid layout mode
            $rootScope.settings.layout.pageContentWhite = true;
            $rootScope.settings.layout.pageBodySolid = false;
            $rootScope.settings.layout.pageSidebarClosed = false;
        }]);
