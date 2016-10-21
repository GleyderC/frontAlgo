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

    //TAB TREE MENU
    this.MenuTree = {
        id: "root",
        active: 1,
        tabList: [
            {
                closable: true,
                head: {
                    icon: 'fa fa-home',
                    text: 'MSG.WELCOME'
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
                    title: 'MENU.COLLATERAL_MANAGEMENT'
                },
                subMenuItems: [
                    {
                        id: 'cm_agreements',
                        head: {
                            icon: 'fa fa-thumbs-o-up font-green',
                            title: 'MENU.COLLATERAL_MANAGEMENT.AGREEMENTS'
                        },
                        view: '/collateral/agreements/index.html',
                        unique: true
                    },
                    {
                        id: 'cm_margin_call',
                        head: {
                            icon: 'fa fa-phone font-green',
                            title: 'MENU.COLLATERAL_MANAGEMENT.MARGIN_CALL'
                        },
                        view: '/collateral/margin_call/main.html',
                        unique: true
                    },
                    {
                        id: 'cm_interest',
                        head: {
                            icon: 'fa fa-calculator font-green',
                            title: 'MENU.COLLATERAL_MANAGEMENT.INTEREST'
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
                    title: 'MENU.COLLATERAL_EXPOSURES'
                },
                subMenuItems: [
                    {
                        id: 'ce_ussuer_risk',
                        head: {
                            icon: ' ',
                            title: 'MENU.COLLATERAL_EXPOSURES.ISSUER_RISK'
                        },
                        view: '/risk/issuer_risk.html',
                        unique: true
                    },
                    {
                        id: 'ce_country_risk',
                        head: {
                            icon: ' ',
                            title: 'MENU.COLLATERAL_EXPOSURES.COUNTRY_RISK'
                        },
                        view: '/risk/country_risk.html',
                        unique: true
                    },
                    {
                        id: 'ce_counterparty_risk',
                        head: {
                            icon: ' ',
                            title: 'MENU.COLLATERAL_EXPOSURES.COUNTERPARTY_RISK'
                        },
                        view: '/risk/counterparty_risk.html',
                        unique: true
                    },
                    {
                        id: 'ce_fx_risk',
                        head: {
                            icon: ' ',
                            title: 'MENU.COLLATERAL_EXPOSURES.FX_RISK'
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
                    title: 'MENU.STATIC_DATA'
                },
                subMenuItems: [
                    {
                        id: 'sd_legal_entity',
                        head: {
                            icon: 'fa fa-bank font-blue-steel',
                            title: 'MENU.STATIC_DATA.LEGAL_ENTITIES'
                        },
                        view: '/static_data/LegalEntity/legal_entity.html',
                        unique: true
                    },
                    {
                        id: 'sd_bilateral_agreements',
                        head: {
                            icon: 'fa fa-briefcase font-blue-steel',
                            title: 'MENU.STATIC_DATA.BILATERAL_AGREEMENTS'
                        },
                        view: '/static_data/BilateralAgreements/bilateral_a_add_search.html',
                        unique: true
                    },
                    {
                        id: 'sd_instruments',
                        tabContainer: 'static_data',
                        head: {
                            icon: 'icon-graph font-blue-steel',
                            title: 'MENU.STATIC_DATA.INSTRUMENTS'
                        },
                        subMenuItems: [
                            {
                                id: 'sd_inst_bond_definition',
                                head: {
                                    icon: 'fa fa-lock font-blue-steel',
                                    title: 'MENU.STATIC_DATA.INSTRUMENTS.BOND_DEFINITION'
                                },
                                view: '/static_data/Security/main.html',
                                unique: true
                            },
                            {
                                id: 'sd_inst_equity_definition',
                                head: {
                                    icon: 'fa fa-lock font-blue-steel',
                                    title: 'MENU.STATIC_DATA.INSTRUMENTS.EQUITY_DEFINITION'
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
                    title: 'MENU.INTEGRATION_REPORTING'
                },
                subMenuItems: [
                    {
                        id: 'ir_fpml_upload',
                        head: {
                            icon: 'fa fa-cloud-upload font-purple-seance',
                            title: 'MENU.INTEGRATION_REPORTING.FPML_UPLOAD'
                        },
                        view: '/integration_reporting/FpmlUpload/fpml_upload.html',
                        unique: true
                    },
                    {
                        id: 'ir_man_files_upload',
                        head: {
                            icon: 'fa fa-upload font-purple-seance',
                            title: 'MENU.INTEGRATION_REPORTING.MANUAL_FILES_UPLOAD'
                        },
                        view: '/integration_reporting/ManualFileUpload/manual_file_upload.html',
                        unique: true
                    },
                    {
                        id: 'ir_audit',
                        head: {
                            icon: 'fa fa-check-square-o font-purple-seance',
                            title: 'MENU.INTEGRATION_REPORTING.AUDIT'
                        },
                        view: '/integration_reporting/Integration/integration.html',
                        unique: true
                    },
                    {
                        id: 'ir_report',
                        head: {
                            icon: 'fa fa-file-text font-purple-seance',
                            title: 'MENU.INTEGRATION_REPORTING.REPORTS'
                        },
                        view: '#',
                        unique: true
                    },
                    {
                        id: 'ir_scheduled_task',
                        head: {
                            icon: 'fa fa-play-circle-o font-purple-seance',
                            title: 'MENU.INTEGRATION_REPORTING.SCHEDULED_TASKS'
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
                    title: 'MENU.CONFIGURATION'
                },
                subMenuItems: [
                    {
                        id: 'configuration_user_management',
                        head: {
                            icon: 'fa fa-users font-green-jungle',
                            title: 'MENU.CONFIGURATION.USERS_MANAGEMENT'
                        },
                        view: '',
                        subMenuItems: [
                            {
                                id: 'conf_users_management',
                                head: {
                                    icon: 'fa fa-user font-green-jungle',
                                    title: 'MENU.CONFIGURATION.USERS_MANAGEMENT.USERS'
                                },
                                view: '/configuration/users_management/users.html',
                                unique: true
                            },
                            {
                                id: 'conf_group_management',
                                head: {
                                    icon: 'fa fa-group font-green-jungle',
                                    title: 'MENU.CONFIGURATION.USERS_MANAGEMENT.GROUPS'
                                },
                                view: '/configuration/users_management/groups.html',
                                unique: true
                            },
                            {
                                id: 'conf_users_group',
                                head: {
                                    icon: 'fa fa-user-plus font-green-jungle',
                                    title: 'MENU.CONFIGURATION.USERS_MANAGEMENT.USERS_GROUPS'
                                },
                                view: '/configuration/users_management/users_group.html',
                                unique: true
                            },
                            {
                                id: 'conf_group_permission',
                                head: {
                                    icon: 'fa fa-unlock-alt font-green-jungle',
                                    title: 'MENU.CONFIGURATION.USERS_MANAGEMENT.GROUP_PERMISSIONS'
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
                            title: 'MENU.CONFIGURATION.STP_WORKFLOWS'
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
                    title: 'MENU.ANALYTICS'
                },
                subMenuItems: [
                    {
                        id: 'analytics_portfolio_analysis',
                        head: {
                            icon: 'icon-bar-chart font-red-flamingo',
                            title: 'MENU.ANALYTICS.PORTFOLIO_ANALYSIS'
                        },
                        view: '',
                        unique: true
                    },
                    {
                        id: 'analytics_trade_analysis',
                        head: {
                            icon: 'icon-bulb font-red-flamingo',
                            title: 'MENU.ANALYTICS.TRADE_ANALYSIS'
                        },
                        view: '#',
                        unique: true
                    },
                    {
                        id: 'analytics_simulation',
                        head: {
                            icon: 'icon-graph font-red-flamingo',
                            title: 'MENU.ANALYTICS.WHAT_IF_SIMULATION'
                        },
                        view: '/analytics/what_if_simulation/search_simulation.html',
                        unique: true
                    }
                ]
            }, /* #6 Analytics */
            {
                id: 'market_data',
                tabContainer: 'root',
                head: {
                    icon: 'fa fa-line-chart font-purple-soft',
                    title: 'MENU.MARKET_DATA'
                },
                subMenuItems: [
                    {
                        id: 'md_closing_prices',
                        head: {
                            icon: 'icon-bar-chart font-purple-soft',
                            title: 'MENU.MARKET_DATA.CLOSING_PRICES'
                        },
                        view: '',
                        subMenuItems: [
                            {
                                id: 'md_cp_fx',
                                head: {
                                    icon: ' ',
                                    title: 'MENU.MARKET_DATA.CLOSING_PRICES.FX'
                                },
                                view: '',
                                unique: true
                            },
                            {
                                id: 'md_cp_bonds',
                                head: {
                                    icon: ' ',
                                    title: 'MENU.MARKET_DATA.CLOSING_PRICES.BONDS'
                                },
                                view: '',
                                unique: true
                            },
                            {
                                id: 'md_cp_fx',
                                head: {
                                    icon: ' ',
                                    title: 'MENU.MARKET_DATA.CLOSING_PRICES.EQUITIES'
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
                    title: 'MENU.USER_MESSAGES'
                },
                subMenuItems: [
                    {
                        id: 'cm_um_messages',
                        head: {
                            icon: 'fa fa-envelope-o font-green-haze',
                            title: 'MENU.USER_MESSAGES.USER_MESSAGES'
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