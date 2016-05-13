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
    $urlRouterProvider.otherwise("home");

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

                            /* select css*/
                            'assets/vendor/bootstrap-select/dist/css/bootstrap-select.min.css',
                            'assets/vendor/select2/dist/css/select2.min.css',
                            'assets/vendor/angular-ui-select/dist/select.min.css',
                            'assets/vendor/multiselect/css/multi-select.css',
                            
                            /* form css */
                             'assets/vendor/bootstrap-fileinput/css/fileinput.min.css',
                            
                            /* select js*/
                            'assets/vendor/bootstrap-select/dist/js/bootstrap-select.min.js',
                            'assets/vendor/select2/dist/js/select2.full.min.js',
                            'assets/vendor/angular-ui-select/dist/select.min.js',
                            'assets/vendor/multiselect/js/jquery.multi-select.js',
                            
                            /* form js */
                            'assets/vendor/bootstrap-fileinput/js/fileinput.min.js',

                            /* Controller js */
                            'collateral-apps/controllers/configuration/LegalEntityController.js'

                        ]
                    });
                }]
            }
        })
}]);