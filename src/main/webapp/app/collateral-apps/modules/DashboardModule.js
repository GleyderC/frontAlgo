/***
 Collateral AngularJS App Main Script
 ***/

/* Collateral App */
var DashboardApp = angular.module("DashboardApp", [
    "CollateralApp","datatables"
]);

/* Setup Rounting For All Pages */
DashboardApp.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
    // Redirect any unmatched url
    $urlRouterProvider.otherwise("home");

    $stateProvider

        .state('home.config', {
            abstract: true,
            url: '/config'
        })
        .state('home.config.legalEntity', {
            url: '/legalEntity',
            data: {pageTitle: 'Legal Entity'},

            views: {
                'content@home': {
                    templateUrl: paths.views + "/configuration/legal_entity.html",
                }
            },
            resolve: {
                deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'Collateral App',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before '#ng_load_plugins_before'
                        files: [

                            /* select css*/
                            'assets/vendor/bootstrap-select/dist/css/bootstrap-select.min.css',
                            'assets/vendor/select2/dist/css/select2.min.css',
                            'assets/vendor/select2-bootstrap-css/select2-bootstrap.min.css',
                            'assets/vendor/angular-ui-select/dist/select.min.css',

                            /* form css */
                            'assets/vendor/bootstrap-fileinput/css/fileinput.min.css',
                            /*'assets/global/plugins/bootstrap-switch/css/bootstrap-switch.min.css',
                             'assets/global/plugins/bootstrap-markdown/css/bootstrap-markdown.min.css',*/

                            /* select js*/
                            'assets/vendor/bootstrap-select/dist/js/bootstrap-select.min.js',
                            'assets/vendor/select2/dist/js/select2.full.min.js',

                            'assets/pages/scripts/components-bootstrap-select.min.js',
                            'assets/pages/scripts/components-select2.min.js',
                            'assets/vendor/angular-ui-select/dist/select.min.js',


                            /* form js */
                            'assets/vendor/bootstrap-fileinput/js/fileinput.min.js',
                            /*'assets/global/plugins/fuelux/js/spinner.min.js',
                             'assets/global/plugins/jquery-inputmask/jquery.inputmask.bundle.min.js',
                             'assets/global/plugins/jquery.input-ip-address-control-1.0.min.js',
                             'assets/global/plugins/bootstrap-pwstrength/pwstrength-bootstrap.min.js',
                             'assets/global/plugins/bootstrap-switch/js/bootstrap-switch.min.js',
                             'assets/global/plugins/bootstrap-maxlength/bootstrap-maxlength.min.js',
                             'assets/global/plugins/bootstrap-touchspin/bootstrap.touchspin.js',
                             'assets/pages/scripts/components-form-tools-2.js'*/

                            'collateral-apps/controllers/configuration/LegalEntityController.js'

                        ]
                    });
                }]
            }
        })
}]);