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
            /* FRONT OFFICE */
            {
                id: 'front_office',
                tabContainer: 'root',
                head: {
                    icon: 'fa fa-arrow-circle-o-right font-green',
                    title: 'MENU.FRONT_OFFICE'
                },
                subMenuItems: [
                    {
                        id: 'new_trade',
                        head: {
                            icon: 'fa fa-plus-square-o font-green',
                            title: 'MENU.FRONT_OFFICE.NEW_TRADE'
                        },
                        view: '/trades/deal_entry/proposal.html',
                        unique: true
                    },
                    {
                        id: 'trade_bloter',
                        head: {
                            icon: 'fa fa-file-text-o font-green',
                            title: 'MENU.FRONT_OFFICE.TRADE_BLOTTER'
                        },
                        view: '/trades/deal_entry/deal_entry_list.html',
                        unique: true
                    }

                ]
            },
            /* BACK OFFICE  */
            {
                id: 'back_office',
                tabContainer: 'root',
                head: {
                    icon: 'fa fa-arrow-circle-o-left font-blue-steel',
                    title: 'MENU.BACK_OFFICE'
                },
                subMenuItems: [
                    {
                        id: 'trade_query_filter',
                        head: {
                            icon: 'fa fa-area-chart font-blue-steel',
                            title: 'MENU.BACK_OFFICE.QUERY_FILTER'
                        },
                        view: '/trades/query_filter/query_filter.html',
                        unique: true
                    },
                    {
                        id: 'bo_view',
                        head: {
                            icon: 'fa fa-eye font-blue-steel',
                            title: 'MENU.BACK_OFFICE.BO_VIEW'
                        },
                        view: '/trades/bo_view/bo_view.html',
                        unique: true
                    },
                    {
                        id: 'liquidity_management',
                        head: {
                            icon: 'fa fa-eur font-blue-steel',
                            title: 'MENU.BACK_OFFICE.LIQUIDITY_MANAGEMENT'
                        },
                        view: '/back_office/liquidity_management/main.html',
                        unique: true
                    },
                    {
                        id: 'proposal',
                        head: {
                            icon: 'fa fa-desktop font-blue-steel',
                            title: 'MENU.BACK_OFFICE.PROPOSAL'
                        },
                        view: '/trades/proposal/search_proposal.html',
                        unique: true
                    }

                ]
            },
            /* Collateral Management */
            {
                id: 'collateral_management',
                tabContainer: 'root',
                head: {
                    icon: 'fa fa-money font-green-jungle',
                    title: 'MENU.COLLATERAL_MANAGEMENT'
                },
                subMenuItems: [
                    {
                        id: 'cm_agreements',
                        head: {
                            icon: 'fa fa-thumbs-o-up font-green-jungle',
                            title: 'MENU.COLLATERAL_MANAGEMENT.AGREEMENTS'
                        },
                        view: '/collateral/agreements/index.html',
                        unique: true
                    },
                    {
                        id: 'cm_margin_call',
                        head: {
                            icon: 'fa fa-phone font-green-jungle',
                            title: 'MENU.COLLATERAL_MANAGEMENT.MARGIN_CALL'
                        },
                        view: '/collateral/margin_call/main.html',
                        unique: true
                    },
                    {
                        id: 'cm_interest',
                        head: {
                            icon: 'fa fa-calculator font-green-jungle',
                            title: 'MENU.COLLATERAL_MANAGEMENT.INTEREST'
                        },
                        view: '/collateral/interest/main.html',
                        unique: true
                    },
                    {
                        id: 'exposure',
                        head: {
                            icon: 'fa fa-warning font-green-jungle',
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
                        ],
                        unique: true
                    }

                ]
            },
            /* Integration and Reporting */
            {
                id: 'integration_reporting',
                tabContainer: 'root',
                head: {
                    icon: 'fa fa-folder-open-o font-yellow-gold',
                    title: 'MENU.INTEGRATION_REPORTING'
                },
                subMenuItems: [
                    {
                        id: 'ir_fpml_upload',
                        head: {
                            icon: 'fa fa-cloud-upload font-yellow-gold',
                            title: 'MENU.INTEGRATION_REPORTING.FPML_UPLOAD'
                        },
                        view: '/integration_reporting/FpmlUpload/fpml_upload.html',
                        unique: true
                    },
                    {
                        id: 'ir_man_files_upload',
                        head: {
                            icon: 'fa fa-upload font-yellow-gold',
                            title: 'MENU.INTEGRATION_REPORTING.MANUAL_FILES_UPLOAD'
                        },
                        view: '/integration_reporting/ManualFileUpload/manual_file_upload.html',
                        unique: true
                    },
                    {
                        id: 'ir_audit',
                        head: {
                            icon: 'fa fa-check-square-o font-yellow-gold',
                            title: 'MENU.INTEGRATION_REPORTING.AUDIT'
                        },
                        view: '/integration_reporting/Integration/integration.html',
                        unique: true
                    },
                    {
                        id: 'ir_report',
                        head: {
                            icon: 'fa fa-file-text font-yellow-gold',
                            title: 'MENU.INTEGRATION_REPORTING.REPORTS'
                        },
                        view: '#',
                        unique: true
                    },
                    {
                        id: 'ir_scheduled_task',
                        head: {
                            icon: 'fa fa-play-circle-o font-yellow-gold',
                            title: 'MENU.INTEGRATION_REPORTING.SCHEDULED_TASKS'
                        },
                        view: '',
                        subMenuItems: [
                            {
                                id: 'ir_scheduled_task_list2',
                                head: {
                                    icon: 'fa fa-list font-yellow-gold',
                                    title: 'List2'
                                },
                                view: '/integration_reporting/ScheduledTask/scheduled_task_list.html',
                                unique: true
                            },
                            {
                                id: 'ir_scheduled_task_list',
                                head: {
                                    icon: 'fa fa-list font-yellow-gold',
                                    title: 'List'
                                },
                                view: '/integration_reporting/ScheduledTask/scheduled_task.html',
                                unique: true
                            },
                            {
                                id: 'ir_scheduled_task_set',
                                head: {
                                    icon: 'fa fa-wrench font-yellow-gold',
                                    title: 'Config'
                                },
                                view: '/integration_reporting/ScheduledTask/scheduled_task_edit.html',
                                unique: true
                            }
                        ],
                        unique: true
                    },
                    {
                        id: 'ir_registr',
                        head: {
                            icon: 'fa fa-pencil-square-o font-yellow-gold',
                            title: 'MENU.CONFIGURATION.REGISTR'
                        },
                        view: '/integration_reporting/RegisTR/regisTR.html',
                        unique: true
                    }
                ]
            },
            /* Administration */
            {
                id: 'configuration',
                tabContainer: 'root',
                head: {
                    icon: 'fa fa-cogs font-red-pink',
                    title: 'MENU.CONFIGURATION'
                },
                subMenuItems: [
                    {
                        id: 'static_data',
                        head: {
                            icon: 'fa fa-database font-red-pink',
                            title: 'MENU.STATIC_DATA'
                        },
                        subMenuItems:[
                            {
                                id: 'sd_legal_entity',
                                head: {
                                    icon: 'fa fa-bank font-red-pink',
                                    title: 'MENU.STATIC_DATA.LEGAL_ENTITIES'
                                },
                                view: '/static_data/LegalEntity/legal_entity.html',
                                unique: true
                            },
                            {
                                id: 'sd_bilateral_agreements',
                                head: {
                                    icon: 'fa fa-briefcase font-red-pink',
                                    title: 'MENU.STATIC_DATA.BILATERAL_AGREEMENTS'
                                },
                                view: '/static_data/BilateralAgreements/bilateral_a_add_search.html',
                                unique: true
                            },
                            {
                                id: 'sd_instruments',
                                tabContainer: 'static_data',
                                head: {
                                    icon: 'icon-pencil font-red-pink',
                                    title: 'MENU.STATIC_DATA.INSTRUMENTS'
                                },
                                subMenuItems: [
                                    {
                                        id: 'sd_inst_bond_definition',
                                        head: {
                                            icon: 'fa fa-lock font-red-pink',
                                            title: 'MENU.STATIC_DATA.INSTRUMENTS.BOND_DEFINITION'
                                        },
                                        view: '/static_data/Security/main.html',
                                        unique: true
                                    },
                                    {
                                        id: 'sd_inst_equity_definition',
                                        head: {
                                            icon: 'fa fa-lock font-red-pink',
                                            title: 'MENU.STATIC_DATA.INSTRUMENTS.EQUITY_DEFINITION'
                                        },
                                        view: '#',
                                        unique: true
                                    }
                                ],
                                view: '',
                                unique: true
                            }
                        ],
                        unique: true
                    },
                    {
                        id: 'configuration_user_management',
                        head: {
                        icon: 'fa fa-users font-red-pink',
                        title: 'MENU.CONFIGURATION.USERS_MANAGEMENT',
                        },
                        subMenuItems: [
                            {
                                id: 'conf_users_management',
                                head: {
                                    icon: 'fa fa-user font-red-pink',
                                    title: 'MENU.CONFIGURATION.USERS_MANAGEMENT.USERS'
                                },
                                view: '/configuration/users_management/users.html',
                                unique: true
                            },
                            {
                                id: 'conf_group_management',
                                head: {
                                    icon: 'fa fa-group font-red-pink',
                                    title: 'MENU.CONFIGURATION.USERS_MANAGEMENT.GROUPS'
                                },
                                view: '/configuration/users_management/groups.html',
                                unique: true
                            },
                            {
                                id: 'conf_users_group',
                                head: {
                                    icon: 'fa fa-user-plus font-red-pink',
                                    title: 'MENU.CONFIGURATION.USERS_MANAGEMENT.USERS_GROUPS'
                                },
                                view: '/configuration/users_management/users_group.html',
                                unique: true
                            },
                            {
                                id: 'conf_group_permission',
                                head: {
                                    icon: 'fa fa-unlock-alt font-red-pink',
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
                            icon: 'fa fa-code-fork font-red-pink',
                            title: 'MENU.CONFIGURATION.STP_WORKFLOWS'
                        },
                        view: '#',
                        unique: true
                    },
                    {
                        id : 'configuration_ccps',
                        head: {
                            icon: 'fa fa-dot-circle-o font-red-pink',
                            title: 'MENU.CONFIGURATION.CCPS'
                        },
                        view: '/configuration/ccps/main.html',
                        unique: true
                    },
                    {id : 'configuration_settlement_account',
                        head: {
                            icon: 'fa fa-dollar font-red-pink',
                            title: 'MENU.CONFIGURATION.SETTACCOUNT'
                        },
                        view: '/configuration/settlement_account/main.html',
                        unique: true
                    },
                    {
                        id: 'market_data',
                        head: {
                            icon: 'fa fa-line-chart font-red-pink',
                            title: 'MENU.MARKET_DATA'
                        },
                        unique: true,
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
                    }
                ]
            },
            /* Analytics */
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
            },
            /* User Messages */
            {
                id: 'cm_user_messages',
                tabContainer: 'root',
                head: {
                    icon: 'fa fa-envelope-o font-yellow-haze',
                    title: 'MENU.USER_MESSAGES'
                },
                subMenuItems: [
                    {
                        id: 'cm_um_messages',
                        head: {
                            icon: 'fa fa-envelope-o font-yellow-haze',
                            title: 'MENU.USER_MESSAGES.USER_MESSAGES'
                        },
                        view: '/user_message/messages.html',
                        unique: true
                    }
                ]
            }
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
