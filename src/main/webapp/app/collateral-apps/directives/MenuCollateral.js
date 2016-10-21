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

    //TAB TREE MENU
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

    //HTML TREE SIDEBAR
    this.htmlTreeMenu =
        [
            {
                id: 'collateral_management',
                tabContainer: 'root',
                head: {
                    icon: 'icon-home font-green',
                    title: 'Collateral Management'
                },
                subMenuItems: [
                    {
                        id: 'cm_agreements',
                        head: {
                            icon: 'fa fa-thumbs-o-up font-green',
                            title: 'Agreements'
                        },
                        view: '/collateral/agreements/index.html',
                        unique: true
                    },
                    {
                        id: 'cm_margin_call',
                        head: {
                            icon: 'fa fa-phone font-green',
                            title: 'Margin Call'
                        },
                        view: '/collateral/margin_call/main.html',
                        unique: true
                    },
                    {
                        id: 'cm_interest',
                        head: {
                            icon: 'fa fa-calculator font-green',
                            title: 'Interest'
                        },
                        view: '/collateral/interest/main.html',
                        unique: true
                    }

                ]
            }, /* #1 Collateral Management */
            {
                id: 'collateral_exposures',
                tabContainer: 'root',
                head: {
                    icon: 'fa fa-warning font-yellow-gold',
                    title: 'Collateral Exposures'
                },
                subMenuItems: [
                    {
                        id: 'ce_ussuer_risk',
                        head: {
                            icon: ' ',
                            title: 'Issuer Risk'
                        },
                        view: '/risk/issuer_risk.html',
                        unique: true
                    },
                    {
                        id: 'ce_country_risk',
                        head: {
                            icon: ' ',
                            title: 'Country Risk'
                        },
                        view: '/risk/country_risk.html',
                        unique: true
                    },
                    {
                        id: 'ce_counterparty_risk',
                        head: {
                            icon: ' ',
                            title: 'Counterparty Risk'
                        },
                        view: '/risk/counterparty_risk.html',
                        unique: true
                    },
                    {
                        id: 'ce_fx_risk',
                        head: {
                            icon: ' ',
                            title: 'Fx Risk'
                        },
                        view: '/risk/issuer_risk.html',
                        unique: true
                    }
                ]
            }, /* #2 Collateral Exposures */
            {
                id: 'static_data',
                tabContainer: 'root',
                head: {
                    icon: 'fa fa-database font-blue-steel',
                    title: 'Static Data'
                },
                subMenuItems: [
                    {
                        id: 'sd_legal_entity',
                        head: {
                            icon: 'fa fa-bank font-blue-steel',
                            title: 'Legal Entities'
                        },
                        view: '/static_data/LegalEntity/legal_entity.html',
                        unique: true
                    },
                    {
                        id: 'sd_bilateral_agreements',
                        head: {
                            icon: 'fa fa-briefcase font-blue-steel',
                            title: 'Bilteral Agreements'
                        },
                        view: '/static_data/BilateralAgreements/bilateral_a_add_search.html',
                        unique: true
                    },
                    {
                        id: 'sd_instruments',
                        tabContainer: 'static_data',
                        head: {
                            icon: 'icon-graph font-blue-steel',
                            title: 'Instruments'
                        },
                        subMenuItems: [
                            {
                                id: 'sd_inst_bond_definition',
                                head: {
                                    icon: 'fa fa-lock font-blue-steel',
                                    title: 'Bond definition'
                                },
                                view: '/static_data/Security/main.html',
                                unique: true
                            },
                            {
                                id: 'sd_inst_equity_definition',
                                head: {
                                    icon: 'fa fa-lock font-blue-steel',
                                    title: 'Equity definition'
                                },
                                view: '#',
                                unique: true
                            }
                        ],
                        view: '',
                        unique: true
                    }
                ]
            }, /* #3 Collateral Exposures */
            {
                id: 'integration_reporting',
                tabContainer: 'root',
                head: {
                    icon: 'fa fa-warning font-purple-seance',
                    title: 'Integration and Reporting'
                },
                subMenuItems: [
                    {
                        id: 'ir_fpml_upload',
                        head: {
                            icon: 'fa fa-cloud-upload font-purple-seance',
                            title: 'FPML Upload'
                        },
                        view: '/integration_reporting/FpmlUpload/fpml_upload.html',
                        unique: true
                    },
                    {
                        id: 'ir_man_files_upload',
                        head: {
                            icon: 'fa fa-upload font-purple-seance',
                            title: 'Manual Files upload'
                        },
                        view: '/integration_reporting/ManualFileUpload/manual_file_upload.html',
                        unique: true
                    },
                    {
                        id: 'ir_audit',
                        head: {
                            icon: 'fa fa-check-square-o font-purple-seance',
                            title: 'Audit'
                        },
                        view: '/integration_reporting/Integration/integration.html',
                        unique: true
                    },
                    {
                        id: 'ir_report',
                        head: {
                            icon: 'fa fa-file-text font-purple-seance',
                            title: 'Reports'
                        },
                        view: '#',
                        unique: true
                    },
                    {
                        id: 'ir_scheduled_task',
                        head: {
                            icon: 'fa fa-play-circle-o font-purple-seance',
                            title: 'Scheduled Task'
                        },
                        view: '/integration_reporting/ScheduledTask/scheduled_task.html',
                        unique: true
                    }
                ]
            }, /* #4 Integration & Reporting */
            {
                id: 'configuration',
                tabContainer: 'root',
                head: {
                    icon: 'fa fa-cogs font-green-jungle',
                    title: 'Configuration'
                },
                subMenuItems: [
                    {
                        id: 'configuration_user_management',
                        head: {
                            icon: 'fa fa-users font-green-jungle',
                            title: 'Users management'
                        },
                        view: '',
                        subMenuItems: [
                            {
                                id: 'conf_users_management',
                                head: {
                                    icon: 'fa fa-user font-green-jungle',
                                    title: 'User'
                                },
                                view: '/configuration/users_management/users.html',
                                unique: true
                            },
                            {
                                id: 'conf_group_management',
                                head: {
                                    icon: 'fa fa-group font-green-jungle',
                                    title: 'Groups'
                                },
                                view: '/configuration/users_management/groups.html',
                                unique: true
                            },
                            {
                                id: 'conf_users_group',
                                head: {
                                    icon: 'fa fa-user-plus font-green-jungle',
                                    title: 'Users - Group'
                                },
                                view: '/configuration/users_management/users_group.html',
                                unique: true
                            },
                            {
                                id: 'conf_group_permission',
                                head: {
                                    icon: 'fa fa-unlock-alt font-green-jungle',
                                    title: 'Group Permissions'
                                },
                                view: '/configuration/users_management/group_permission.html',
                                unique: true
                            }
                        ],
                        unique: true
                    },
                    {
                        id: 'configuration_stp_workflows',
                        head: {
                            icon: 'fa fa-code-fork font-green-jungle',
                            title: 'STP Workflows'
                        },
                        view: '#',
                        unique: true
                    }
                ]
            }, /* #5 Configuration */
            {
                id: 'analytics',
                tabContainer: 'root',
                head: {
                    icon: 'fa fa-bar-chart font-red-flamingo',
                    title: 'Analytics'
                },
                subMenuItems: [
                    {
                        id: 'analytics_portfolio_analysis',
                        head: {
                            icon: 'icon-bar-chart font-red-flamingo',
                            title: 'Portfolio analysis'
                        },
                        view: '',
                        unique: true
                    },
                    {
                        id: 'analytics_trade_analysis',
                        head: {
                            icon: 'icon-bulb font-red-flamingo',
                            title: 'Trade analysis'
                        },
                        view: '#',
                        unique: true
                    },
                    {
                        id: 'analytics_simulation',
                        tabContainer: 'analytics',
                        head: {
                            icon: 'icon-graph font-red-flamingo',
                            title: 'What-if simulation'
                        },
                        view: '',
                        unique: true,
                        subMenuItems: [
                            {
                                id: 'analytics_simulation_search',
                                head: {
                                    icon: 'icon-graph font-red-flamingo',
                                    title: 'Simulation'
                                },
                                view: '/analytics/what_if_simulation/search_simulation.html',
                                unique: true
                            },
                            {
                                id: 'analytics_simulation_test',
                                head: {
                                    icon: 'fa fa-caret-square-o-right font-red-flamingo',
                                    title: 'Simulation Test'
                                },
                                view: '/analytics/what_if_simulation/test/test_simulation.html',
                                unique: true
                            }]
                    }
                ]
            }, /* #6 Analytics */
            {
                id: 'market_data',
                tabContainer: 'root',
                head: {
                    icon: 'fa fa-line-chart font-purple-soft',
                    title: 'Market Data'
                },
                subMenuItems: [
                    {
                        id: 'md_closing_prices',
                        head: {
                            icon: 'icon-bar-chart font-purple-soft',
                            title: 'Closing prices'
                        },
                        view: '',
                        subMenuItems: [
                            {
                                id: 'md_cp_fx',
                                head: {
                                    icon: ' ',
                                    title: 'FX'
                                },
                                view: '',
                                unique: true
                            },
                            {
                                id: 'md_cp_bonds',
                                head: {
                                    icon: ' ',
                                    title: 'Bonds'
                                },
                                view: '',
                                unique: true
                            },
                            {
                                id: 'md_cp_fx',
                                head: {
                                    icon: ' ',
                                    title: 'Equities'
                                },
                                view: '',
                                unique: true
                            }
                        ],
                        unique: true
                    }
                ]
            }, /* #7 Market Data */
            {
                id: 'cm_user_messages',
                tabContainer: 'root',
                head: {
                    icon: 'fa fa-envelope-o font-green-haze',
                    title: 'User Messages'
                },
                subMenuItems: [
                    {
                        id: 'cm_um_messages',
                        head: {
                            icon: 'fa fa-envelope-o font-green-haze',
                            title: 'User Messages'
                        },
                        view: '/user_message/messages.html',
                        unique: true
                    }
                ]
            }, /* #8 User Messages */
        ];


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