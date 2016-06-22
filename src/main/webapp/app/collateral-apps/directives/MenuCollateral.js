//Build Menu
DashboardApp.directive('menuCollateral', ['$rootScope', function ($rootScope) {
    return {
        restrict: "AE",
        templateUrl: "collateral-apps/tpl/MenuCollateral.html",
        link: function(scope, iElem, iAttrs){
            
        }
    }
}]);

DashboardApp.service('MenuService', function(){
    /*this.MenuTree = [
        {
            head: {
                icon: 'glyphicon glyphicon-refresh glyphicon-refresh-animate',
                text: 'GrandPa'
            },
            content: '',
            templateUrl: '',
            childrenTabs: [
                {
                    head: {
                        icon: 'glyphicon glyphicon-refresh glyphicon-refresh-animate',
                        text: 'Child1'
                    },
                    content: '',
                    templateUrl: '',
                    childrenTabs: [
                        {
                            head: {
                                icon: 'glyphicon glyphicon-refresh glyphicon-refresh-animate',
                                text: 'last child1'
                            },
                            content: '',
                            templateUrl: '',
                            childrenTabs: [
                                {
                                    head: {
                                        icon: 'glyphicon glyphicon-refresh glyphicon-refresh-animate',
                                        text: 'the last of us'
                                    },
                                    content: '',
                                    templateUrl: '',
                                    childrenTabs: [],
                                    resolve: {
                                        formData: []
                                    },
                                    disabled: false,
                                    closable: false,
                                    callback: function () {
                                    }
                                }
                            ],
                            resolve: {
                                formData: []
                            },
                            disabled: false,
                            closable: false,
                            callback: function () {
                            }
                        }
                    ],
                    resolve: {
                        formData: []
                    },
                    disabled: false,
                    closable: false,
                    callback: function () {
                    }
                },
                {
                    head: {
                        icon: 'glyphicon glyphicon-refresh glyphicon-refresh-animate',
                        text: ''
                    },
                    content: '',
                    templateUrl: 'child2',
                    childrenTabs: [
                        {
                            head: {
                                icon: 'glyphicon glyphicon-refresh glyphicon-refresh-animate',
                                text: 'last child2'
                            },
                            content: '',
                            templateUrl: '',
                            childrenTabs: [],
                            resolve: {
                                formData: []
                            },
                            disabled: false,
                            closable: false,
                            callback: function () {
                            }
                        }
                    ],
                    resolve: {
                        formData: []
                    },
                    disabled: false,
                    closable: false,
                    callback: function () {
                    }
                }
            ],
            resolve: {
                formData: []
            },
            disabled: false,
            closable: false,
            callback: function () {
            }
        }
    ]*/

    this.MenuTree = [
        {
            head: {
                icon: 'glyphicon glyphicon-refresh glyphicon-refresh-animate',
                text: 'GrandPa'
            },
            content: 'Content GrandPa',
            templateUrl: '',
            childrenTabs: [
                {
                    head: {
                        icon: 'glyphicon glyphicon-refresh glyphicon-refresh-animate',
                        text: 'Father 1'
                    },
                    content: 'Content Father1',
                    templateUrl: '',
                    childrenTabs: [
                        {
                            head: {
                                icon: 'glyphicon glyphicon-refresh glyphicon-refresh-animate',
                                text: 'Son 1'
                            },
                            content: 'Content Son 1',
                            templateUrl: '',
                            childrenTabs: [],
                            resolve: {
                                formData: []
                            },
                            disabled: false,
                            closable: false,
                            callback: function () {
                            }
                        },
                        {
                            head: {
                                icon: 'glyphicon glyphicon-refresh glyphicon-refresh-animate',
                                text: 'Son 2'
                            },
                            content: 'Content Son 2',
                            templateUrl: '',
                            childrenTabs: [],
                            resolve: {
                                formData: []
                            },
                            disabled: false,
                            closable: false,
                            callback: function () {
                            }
                        }
                    ],
                    resolve: {
                        formData: []
                    },
                    disabled: false,
                    closable: false,
                    callback: function () {
                    }
                }
                ,{
                    head: {
                        icon: 'glyphicon glyphicon-refresh glyphicon-refresh-animate',
                        text: 'Father 2'
                    },
                    content: 'Content Father2',
                    templateUrl: '',
                    childrenTabs: [],
                    resolve: {
                        formData: []
                    },
                    disabled: false,
                    closable: false,
                    callback: function () {
                    }
                }
            ],
            resolve: {
                formData: []
            },
            disabled: false,
            closable: false,
            callback: function () {
            }
        }
    ]
});