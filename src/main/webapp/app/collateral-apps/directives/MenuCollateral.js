//Build Menu
'use strict';

DashboardApp.directive('menuCollateral', ['$rootScope', function ($rootScope) {
    return {
        restrict: "AE",
        templateUrl: "collateral-apps/tpl/MenuCollateral.html",
        link: function (scope, iElem, iAttrs) {

        }
    }
}]);

DashboardApp.service('MenuService', function () {
    var _that = this;

    this.OLDMenuTree = {
        active: 1,
        tabList: [
            {
                head: {
                    icon: 'icon-home',
                    text: 'Collateral Management'
                },
                childWorkspace: {
                    active: 1,
                    tabList: [
                        {
                            head: {
                                icon: 'icon-home',
                                text: 'Agreements'
                            },
                            templateUrl: paths.views + '/collateral/agreements/index.html',
                            autoload: true
                        },
                        {
                            head: {
                                icon: 'fa fa-phone',
                                text: 'Margin Call'
                            },
                            childWorkspace: {
                                tabList: [
                                    {
                                        head: {
                                            icon: 'fa fa-home',
                                            text: 'Main'
                                        },
                                        templateUrl: paths.views + '/collateral/margin_call/main.html',
                                        autoload: true
                                    },
                                ]
                            },
                            autoload: true
                        },
                        {
                            head: {
                                icon: 'fa fa-calculator',
                                text: 'Interest'
                            },
                            childWorkspace: {
                                tabList: [
                                    {
                                        head: {
                                            icon: 'fa fa-home',
                                            text: 'Main'
                                        },
                                        templateUrl: paths.views + '/collateral/interest/main.html',
                                        autoload: true
                                    },
                                ]
                            },

                        }
                    ]
                }
            },
            {
                head: {
                    icon: 'fa fa-envelope-o',
                    text: 'User Messages'
                },
                templateUrl: paths.views + '/user_message/messages.html',
                autoload: true
            },
            {
                head: {
                    icon: 'fa fa-database',
                    text: 'Static Data'
                },
                childWorkspace: {
                    tabList: [
                        {
                            head: {
                                icon: 'fa fa-bank',
                                text: 'Legal Entity'
                            },
                            childWorkspace: {
                                tabList: [
                                    {
                                        head: {
                                            icon: 'fa fa-search',
                                            text: 'Search Legal Entity'
                                        },
                                        templateUrl: paths.views + '/static_data/LegalEntity/legal_entity.html',
                                        autoload: true
                                    }]
                            }
                        },
                        {
                            head: {
                                icon: 'fa fa-briefcase',
                                text: 'Bilateral Contract'
                            },
                            childWorkspace: {
                                id: "BilateralContractWS",
                                tabList: [
                                    {
                                        head: {
                                            icon: 'fa fa-search',
                                            text: 'Search Bilateral Agreements'
                                        },
                                        templateUrl: paths.views + '/static_data/BilateralAgreements/bilateral_a_add_search.html',
                                        autoload: true
                                    }
                                ]
                            }
                        },
                        {
                            head: {
                                icon: 'fa fa-lock',
                                text: 'Security'
                            },
                            childWorkspace: {
                                tabList: [
                                    {
                                        head: {
                                            icon: 'fa fa-search',
                                            text: 'Search Security'
                                        },
                                        templateUrl: paths.views + '/static_data/Security/main.html',
                                        autoload: true
                                    }
                                ]
                            }
                        }
                    ]
                }
            },
            {
                head: {
                    icon: 'fa fa-warning',
                    text: 'Collateral Dashboard'
                },
                childWorkspace: {
                    tabList: [
                        {
                            head: {
                                icon: '',
                                text: 'CounterParty Risk'
                            },
                            templateUrl: paths.views + '/risk/counterparty_risk.html',
                            autoload: true
                        },
                        {
                            head: {
                                icon: '',
                                text: 'Country Risk'
                            },
                            templateUrl: paths.views + '/risk/country_risk.html',
                            autoload: true
                        },
                        {
                            head: {
                                icon: '',
                                text: 'Issuer Risk'
                            },
                            templateUrl: paths.views + '/risk/issuer_risk.html',
                            autoload: true
                        },
                        {
                            head: {
                                icon: '',
                                text: 'FX Risk'
                            },
                            templateUrl: paths.views + '/risk/fx_risk.html',
                            autoload: true
                        }
                    ]
                },

            },
            {
                head: {
                    icon: 'fa fa-edit',
                    text: 'Integration & Reporting'
                },
                childWorkspace: {
                    tabList: [
                        {
                            head: {
                                icon: 'fa fa-cloud-upload',
                                text: 'FPML upload'
                            },
                            templateUrl: paths.views + '/integration_reporting/FpmlUpload/fpml_upload.html',
                            autoload: true
                        },
                        {
                            head: {
                                icon: 'fa fa-upload',
                                text: 'Manual Files upload'
                            },
                            templateUrl: paths.views + '/integration_reporting/ManualFileUpload/manual_file_upload.html',
                            autoload: true
                        },
                        {
                            head: {
                                icon: 'fa-file-text',
                                text: 'Audit'
                            },
                            templateUrl: paths.views + '/integration_reporting/Integration/integration.html',
                            autoload: true
                        },
                        {
                            head: {
                                icon: 'fa fa-play-circle-o',
                                text: 'Scheduled Task'
                            },
                            templateUrl: paths.views + '/integration_reporting/ScheduledTask/scheduled_task.html',
                            autoload: true
                        }
                    ]
                },

            },
            {
                head: {
                    icon: 'fa fa-cogs',
                    text: 'Configuration'
                },
                childWorkspace: {
                    tabList: [
                        {
                            head: {
                                icon: 'fa fa-users',
                                text: 'Users management'
                            },
                            childWorkspace: {
                                tabList: [
                                    {
                                        head: {
                                            icon: 'fa fa-user',
                                            text: 'User'
                                        },
                                        templateUrl: paths.views + '/configuration/users_management/users.html',
                                        autoload: true
                                    },
                                    {
                                        head: {
                                            icon: 'fa fa-group',
                                            text: 'Groups'
                                        },
                                        templateUrl: paths.views + '/configuration/users_management/groups.html',
                                        autoload: true
                                    },
                                    {
                                        head: {
                                            icon: 'fa fa-user-plus',
                                            text: 'Users-Group'
                                        },
                                        templateUrl: paths.views + '/configuration/users_management/users_group.html',
                                        autoload: true,
                                        onSelect: function () {

                                        }
                                    },
                                    {
                                        head: {
                                            icon: 'fa fa-unlock-alt',
                                            text: 'Group Permissions'
                                        },
                                        templateUrl: paths.views + '/configuration/users_management/group_permission.html',
                                        autoload: true
                                    },
                                ]
                            }
                        }
                    ]
                },

            }
        ]
    }

    this.MenuTree = {
        id: "root",
        active: 1,
        tabList: [
            {
                closable: true,
                head: {
                    icon: 'fa fa-home',
                    text: 'Welcome'
                },
                templateUrl: paths.views + '/welcome.html',
                autoload: true
            }
        ]
    };

    this.linkParents = function (tree) {

        let CMtree = {};

        if (!angular.isUndefined(tree)) {
            CMtree = tree;
        }
        else {
            CMtree = _that.MenuTree
        }

        angular.forEach(CMtree.tabList, function (ws, index) {


            if (!angular.isUndefined(ws.childWorkspace)) {

                if (angular.isUndefined(ws.childWorkspace.wsParent)) {

                    ws.childWorkspace.wsParent = CMtree;
                    ws.childWorkspace.indexParent = index;

                }

                _that.linkParents(ws.childWorkspace);

            }

        });
    }
});

DashboardApp.run(['MenuService', function ($menuService) {

    $menuService.linkParents();

}]);