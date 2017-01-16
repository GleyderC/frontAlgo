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
                        view: '',
                        subMenuItems: [
                            {
                                id: 'ir_scheduled_task_list',
                                head: {
                                    icon: 'fa fa-list font-purple-seance',
                                    title: 'List'
                                },
                                view: '/integration_reporting/ScheduledTask/scheduled_task.html',
                                unique: true
                            },
                            {
                                id: 'ir_scheduled_task_set',
                                head: {
                                    icon: 'fa fa-wrench font-purple-seance',
                                    title: 'Config'
                                },
                                view: '/integration_reporting/ScheduledTask/set_scheduled_task.html',
                                unique: true
                            }
                        ],
                        unique: true
                    },
                    {
                        id: 'ir_registr',
                        head: {
                            icon: 'fa fa-play-circle-o font-purple-seance',
                            title: 'RegisTR'
                        },
                        view: '/integration_reporting/RegisTR/regisTR.html',
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
                    },
                    {
                        id : 'configuration_ccps',
                        head: {
                            icon: 'fa fa-dot-circle-o font-green-jungle',
                            title: 'MENU.CONFIGURATION.CCPS'
                        },
                        view: '/configuration/ccps/main.html',
                        unique: true
                    },
                    {
                        id : 'configuration_settlement_account',
                        head: {
                            icon: 'fa fa-dollar font-green-jungle',
                            title: 'MENU.CONFIGURATION.SETTACCOUNT'
                        },
                        view: '/configuration/settlement_account/main.html',
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
                        tabContainer: 'analytics',
                        head: {
                            icon: 'icon-graph font-red-flamingo',
                            title: 'MENU.ANALYTICS.WHAT_IF_SIMULATION'
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
            {
                id: 'trades',
                tabContainer: 'root',
                head: {
                    icon: 'fa fa-area-chart font-yellow-soft',
                    title: 'MENU.TRADES'
                },
                subMenuItems: [
                    {
                        id: 'deal_entry',
                        head: {
                            icon: 'fa fa-area-chart font-yellow-soft',
                            title: 'MENU.TRADES.DEAL_ENTRY'
                        },
                        view: '/trades/deal_entry/deal_entry_list.html',
                        unique: true
                    },
                    {
                        id: 'proposal',
                        head: {
                            icon: 'fa fa-area-chart font-yellow-soft',
                            title: 'MENU.TRADES.PROPOSAL'
                        },
                        view: '/trades/proposal/search_proposal.html',
                        unique: true
                    },
                    {
                        id: 'trades_query_filter',
                        head: {
                            icon: 'fa fa-area-chart font-yellow-soft',
                            title: 'MENU.TRADES.QUERY_FILTER'
                        },
                        view: '/trades/query_filter/query_filter.html',
                        unique: true
                    }
                ]
            }, /* #9 Trade Query */
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
