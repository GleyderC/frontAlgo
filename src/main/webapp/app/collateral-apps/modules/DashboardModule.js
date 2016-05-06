/***
 Collateral AngularJS App Main Script
 ***/

/* Collateral App */
var DashboardApp = angular.module("DashboardApp", [
    "CollateralApp"
]);

/* Setup Rounting For All Pages */
DashboardApp.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
    // Redirect any unmatched url
    $urlRouterProvider.otherwise("dashboard");

    $stateProvider

        .state('home.config',{
            abstract: true,
            url: '/config'
        })
        .state('home.config.legalEntity', {
            url: '/legalEntity',
            data: {pageTitle: 'Legal Entity'},

            views: {
                'content@home':
                {
                    templateUrl: paths.views + "/configuration/legal_entity.html",
                }
            },
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'Collateral App',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before '#ng_load_plugins_before'
                        files: [
                            'assets/global/plugins/datatables/datatables.min.css',
                            'assets/global/plugins/datatables/plugins/bootstrap/datatables.bootstrap.css',

                            'assets/global/plugins/datatables/datatables.all.min.js',

                            'assets/pages/scripts/table-datatables-managed.min.js',
                        ]
                    });
                }]
            }
        })
}]);