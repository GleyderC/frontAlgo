/***
Collateral AngularJS App Main Script
***/

/* Collateral App */
var CollateralApp = angular.module("CollateralApp", [
    "ui.router",
    "ui.bootstrap",
    "oc.lazyLoad",
    "ngSanitize",
    "duScroll",
    "ngCookies",
    "LocalStorageModule",
    "toastr",
    'ui.utils.masks'
]);

var paths = {

    views: "collateral-apps/views",
    tpls:   "collateral-apps/tpl"

};

// ## Begin Strict Context Escaping Config
CollateralApp.config(['$sceDelegateProvider', function ($sceDelegateProvider) {
    $sceDelegateProvider.resourceUrlWhitelist([
        // Allow same origin resource loads.
        'self',
        // Allow loading from outer templates domain.
        'http://**.example.com/**'
    ]);
}]);

CollateralApp.config(function ($sceProvider) {
    // Completely disable SCE.  For demonstration purposes only!
    // Do not use in new projects.
    //$sceProvider.enabled(false);
});
// ## End Strict Context Escaping Config

/* Configure ocLazyLoader(refer: https://github.com/ocombe/ocLazyLoad) */
CollateralApp.config(['$ocLazyLoadProvider', function($ocLazyLoadProvider) {
    $ocLazyLoadProvider.config({
        // global configs go here
    });
}]);

//AngularJS v1.3.x workaround for old style controller declarition in HTML
CollateralApp.config(['$controllerProvider', function($controllerProvider) {
  // this option might be handy for migrating old apps, but please don't use it
  // in new ones!
  $controllerProvider.allowGlobals();
}]);

//notification with angular-toastr
CollateralApp.config(function(toastrConfig) {
    angular.extend(toastrConfig, {
        allowHtml: false,
        closeButton: false,
        closeHtml: '<button>&times;</button>',
        extendedTimeOut: 1000,
        iconClasses: {
            error: 'toast-error',
            info: 'toast-info',
            success: 'toast-success',
            warning: 'toast-warning'
        },
        messageClass: 'toast-message',
        onHidden: null,
        onShown: null,
        onTap: null,
        progressBar: false,
        tapToDismiss: true,
        templates: {
            toast: 'directives/toast/toast.html',
            progressbar: 'directives/progressbar/progressbar.html'
        },
        timeOut: 5000,
        titleClass: 'toast-title',
        toastClass: 'toast'
    });
});

/********************************************
 END: BREAKING CHANGE in AngularJS v1.3.x:
*********************************************/

/* Setup global settings */
CollateralApp.factory('settings', ['$rootScope', function($rootScope, $urlSettings) {
    // supported languages
    var settings = {

        layout: {
            pageSidebarClosed: false, // sidebar menu state
            pageContentWhite: true, // set page content layout
            pageBodySolid: false, // solid body color state
            pageAutoScrollOnLoad: 1000 // auto scroll to top on page load
        },
        assetsPath: 'assets',
        globalPath: 'assets/global',
        layoutPath: 'assets/layouts/layout',
    };

    $rootScope.settings = settings;

    return settings;
}]);


/* Setup App Main Controller */
CollateralApp.controller('AppController', ['$scope', '$request', 'localStorageService', function($scope, $request, $localStorage) {
    
    $scope.$on('$viewContentLoaded', function() {
        App.initComponents(); // init core components
        Layout.init(); //  Init entire layout(header, footer, sidebar, etc) on page load if the partials included in server side instead of loading with ng-include directive
    });

}]);

/***
Layout Partials.
By default the partials are loaded through AngularJS ng-include directive. In case they loaded in server side(e.g: PHP include function) then below partial
initialization can be disabled and Layout.init() should be called on page load complete as explained above.
***/

/* Setup Layout Part - Header */
CollateralApp.controller('HeaderController', ['$scope', function($scope) {
    $scope.$on('$includeContentLoaded', function() {
        Layout.initHeader(); // init header
    });
}]);

/* Setup Layout Part - Sidebar */
CollateralApp.controller('SidebarController', ['$scope', function($scope) {
    $scope.$on('$includeContentLoaded', function() {
        Layout.initSidebar(); // init sidebar
    });
}]);

/* Setup Layout Part - Quick Sidebar */
CollateralApp.controller('QuickSidebarController', ['$scope', function($scope) {
    $scope.$on('$includeContentLoaded', function() {
       setTimeout(function(){
            QuickSidebar.init(); // init quick sidebar
        }, 2000)
    });
}]);

/* Setup Layout Part - Sidebar */
CollateralApp.controller('PageHeadController', ['$scope', function($scope) {
    $scope.$on('$includeContentLoaded', function() {
        Demo.init(); // init theme panel
    });
}]);

/* Setup Layout Part - Theme Panel */
CollateralApp.controller('ThemePanelController', ['$scope', function($scope) {
    $scope.$on('$includeContentLoaded', function() {
        Demo.init(); // init theme panel
    });
}]);

/* Setup Layout Part - Footer */
CollateralApp.controller('FooterController', ['$scope', function($scope) {
    $scope.$on('$includeContentLoaded', function() {
        //Layout.initFooter(); // init footer
    });
}]);


/* ###### Collateral Request Service #####*/

//interceptor all request
CollateralApp.factory('httpGlobalInterceptor',['$q', '$injector', 'localStorageService', '$log', function ($q, $injector, $localStorage, $log) {
    return {
        'request': function (config) {
            config.headers = config.headers || {};
            if ($localStorage.token) {
                config.headers.Authorization = 'Bearer ' + $localStorage.token;
            }
            return config;
        },
        'requestError': function(rejection) {

            $injector.get('toastr').error("Error sending data to the server","Server Error",{closeButton: true});
            $log.warn("There is an error. Reason:");
            $log.debug("http_code: " + rejection.status + ", Response: " + rejection.statusText);

            if (canRecover(rejection)) {
                return responseOrNewPromise
            }
            return $q.reject(rejection);
        },
        'response': function(response) {

            return response;
        },
        'responseError': function(response) {
            
            $injector.get('toastr').error("Acess to the requested resource has been denied","Unauthorized Error",{closeButton: true});
            $log.warn("There is an error. Reason:");
            $log.debug("http_code: " + response.status + ", Response: " + response.statusText);

            if (response.status === 401 || response.status === 403) {
                $injector.get('$state').go('login');
            }
            return $q.reject(response);
        }
    };
}]);

CollateralApp.factory('$request',['$rootScope','$http','URL_CONFIG','$log',function($rootScope,$http, URL_CONFIG, $log){

    
    var request = {};

    request.get = function  (urlRelative, dataRequest)
    {
        var config_request = {};
        if( !!dataRequest && typeof dataRequest === 'object' ){
            config_request = {
                params: dataRequest
            };
        }

        return $http.get( URL_CONFIG.API_URL + '' + urlRelative, config_request);

    }

    request.post = function (urlRelative, dataRequest){

        return $http.post( URL_CONFIG.API_URL + '' + urlRelative, dataRequest);

    }

    request.put = function (urlRelative, dataRequest){

        return $http.put( URL_CONFIG.API_URL + '' + urlRelative, dataRequest);

    }

    request.delete = function  (urlRelative, dataRequest)
    {
        var config_request = {};
        if( !!dataRequest && typeof dataRequest === 'object' ){
            config_request =
            {
                data: dataRequest
            };
        }

        //return $http.delete( URL_CONFIG.API_URL + '' + urlRelative, config_request);
        return $http.post( URL_CONFIG.API_URL + '' + urlRelative, dataRequest);

    }

    return request;

}]);

/*Default Setup $http Service*/
CollateralApp.config(['$httpProvider', function($httpProvider){

    //default config all requets
    $httpProvider.defaults.headers.common['Accept'] = 'application/json, text/javascript';
    $httpProvider.interceptors.push('httpGlobalInterceptor');

}]);
/* #### CONFIG $request SERVICE END #### */


/* Setup Rounting For All Pages */
CollateralApp.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider ) {
    // Redirect any unmatched url
    $urlRouterProvider.otherwise("login");

    $stateProvider

        //login
        .state('login', {
            url: '/login',
            data: {pageTitle: 'Collateral User Login'},

            views: {
                'main-content@':
                {
                    templateUrl: paths.views + '/login/user_login.jsp',
                    controller: 'LoginController',
                    controllerAs: 'loginCtrl',
                }
            },
            resolve: {
                deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'CollateralApp',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                        files: [
                            'assets/pages/css/login.css',
                            'assets/global/plugins/jquery-validation/js/jquery.validate.min.js',
                            'assets/global/plugins/jquery-validation/js/additional-methods.min.js',
                            'assets/pages/scripts/login.js',
                            'collateral-apps/controllers/LoginController.js'
                        ],
                        serie: true
                    });
                }]
            }
        })

        // Home
        .state('home', {
            url: "/home",

            data: {pageTitle: 'Collateral'},

            views: {
                'header@': {
                    templateUrl: 'collateral-apps/views/header.jsp',
                },
                'main-content@':
                {
                    templateUrl: paths.views + "/dashboard/dashboard.jsp",
                    controller: 'DashboardController',
                    controllerAs: 'dashboardCtrl',
                }
            },
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'DashboardApp',
                        insertBefore: '#ng_load_plugins_before', // load dependencies before load page inside the element
                        files: [
                            /* datatable css*/
                            //'assets/vendor/DataTables-net/datatables.min.css',

                            /* select css*/
                            'assets/vendor/select2/select2.css',
                            'assets/vendor/selectize/dist/css/selectize.css',
                            'assets/vendor/angular-ui-select/dist/select.min.css',
                            'assets/vendor/multiselect/css/multi-select.css',

                            /* form css */
                            //'assets/vendor/bootstrap-fileinput/css/fileinput.min.css',

                            /* datatable js
                            'assets/vendor/DataTables-net/datatables.min.js',
                            'assets/vendor/angular-datatables/dist/angular-datatables.min.js',*/

                            /* select js*/
                            //'assets/vendor/select2/dist/js/select2.full.min.js',
                            'assets/vendor/angular-ui-select/dist/select.min.js',
                            'assets/vendor/multiselect/js/jquery.multi-select.js',

                            /* form js */
                            //'assets/vendor/bootstrap-fileinput/js/fileinput.min.js',

                            /* Dashboard */
                            'collateral-apps/modules/DashboardModule.js',
                            'collateral-apps/controllers/DashboardController.js',

                            /* Directives */
                            'collateral-apps/directives/MenuCollateral.js',
                            'collateral-apps/directives/AngularMultiselectDual.js',
                            'collateral-apps/directives/bsSwitch.js',
                            'collateral-apps/directives/TabManagement.js',
                            'collateral-apps/directives/UiSelectWrap.js',

                            /* Services */
                            'collateral-apps/services/DashboardService.js',
                            'collateral-apps/services/MarginCallService.js',
                            'collateral-apps/services/AgreementsService.js',
                            'collateral-apps/services/LegalEntityService.js',
                            'collateral-apps/services/InterestService.js',
                            'collateral-apps/services/RowEditorModalService.js',
                            'collateral-apps/services/configuration/BilateralContractService.js',
                            'collateral-apps/services/UserMessageService.js',
                            'collateral-apps/services/ModalService.js',

                            /* Legal Entity Controller js */
                            'collateral-apps/controllers/configuration/LegalEntityController.js',
                            /* Bilateral Controller js */
                            'collateral-apps/controllers/configuration/BilateralAgreementsController.js',
                            /* Agreements Controller js */
                            'collateral-apps/controllers/collateral/agreements/AgreementsController.js',
                            /* Margin Call Controller js */
                            'collateral-apps/controllers/collateral/margin_call/MarginCallController.js',
                            'collateral-apps/controllers/collateral/margin_call/MarginCallDetailController.js',
                            'collateral-apps/controllers/collateral/margin_call/MarginCallTradesController.js',
                            'collateral-apps/controllers/collateral/margin_call/MarginCallCsaController.js',
                            'collateral-apps/controllers/collateral/margin_call/MarginCallInventoryController.js',
                            'collateral-apps/controllers/collateral/margin_call/MarginCallMessagingRepository.js',
                            /* Interest Controller js */
                            'collateral-apps/controllers/collateral/interest/InterestController.js',
                            /*UserMessage Controller*/
                            'collateral-apps/controllers/user_message/UserMessageController.js'

                        ],
                        serie: true,
                        cache: false
                    });
                }]
            }
        })



//############################# OWN ROUTES END #################################################
        // AngularJS plugins
        .state('fileupload', {
            url: "/file_upload.html",
            templateUrl: "views/file_upload.html",
            data: {pageTitle: 'AngularJS File Upload'},
            controller: "GeneralPageController",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load([{
                        name: 'angularFileUpload',
                        files: [
                            'assets/global/plugins/angularjs/plugins/angular-file-upload/angular-file-upload.min.js',
                        ]
                    }, {
                        name: 'CollateralApp',
                        files: [
                            'js/controllers/GeneralPageController.js'
                        ]
                    }]);
                }]
            }
        })

        // UI Select
        .state('uiselect', {
            url: "/ui_select.html",
            templateUrl: "views/ui_select.html",
            data: {pageTitle: 'AngularJS Ui Select'},
            controller: "UISelectController",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load([{
                        name: 'ui.select',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before '#ng_load_plugins_before'
                        files: [
                            'assets/global/plugins/angularjs/plugins/ui-select/select.min.css',
                            'assets/global/plugins/angularjs/plugins/ui-select/select.min.js'
                        ]
                    }, {
                        name: 'CollateralApp',
                        files: [
                            'js/controllers/UISelectController.js'
                        ]
                    }]);
                }]
            }
        })

        // UI Bootstrap
        .state('uibootstrap', {
            url: "/ui_bootstrap.html",
            templateUrl: "views/ui_bootstrap.html",
            data: {pageTitle: 'AngularJS UI Bootstrap'},
            controller: "GeneralPageController",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load([{
                        name: 'CollateralApp',
                        files: [
                            'js/controllers/GeneralPageController.js'
                        ]
                    }]);
                }]
            }
        })

        // Tree View
        .state('tree', {
            url: "/tree",
            templateUrl: "views/tree.html",
            data: {pageTitle: 'jQuery Tree View'},
            controller: "GeneralPageController",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load([{
                        name: 'CollateralApp',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before '#ng_load_plugins_before'
                        files: [
                            'assets/global/plugins/jstree/dist/themes/default/style.min.css',

                            'assets/global/plugins/jstree/dist/jstree.min.js',
                            'assets/pages/scripts/ui-tree.min.js',
                            'js/controllers/GeneralPageController.js'
                        ]
                    }]);
                }]
            }
        })

        // Form Tools
        .state('formtools', {
            url: "/form-tools",
            templateUrl: "views/form_tools.html",
            data: {pageTitle: 'Form Tools'},
            controller: "GeneralPageController",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load([{
                        name: 'CollateralApp',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before '#ng_load_plugins_before'
                        files: [
                            'assets/global/plugins/bootstrap-fileinput/bootstrap-fileinput.css',
                            'assets/global/plugins/bootstrap-switch/css/bootstrap-switch.min.css',
                            'assets/global/plugins/bootstrap-markdown/css/bootstrap-markdown.min.css',
                            'assets/global/plugins/typeahead/typeahead.css',

                            'assets/global/plugins/fuelux/js/spinner.min.js',
                            'assets/global/plugins/bootstrap-fileinput/bootstrap-fileinput.js',
                            'assets/global/plugins/jquery-inputmask/jquery.inputmask.bundle.min.js',
                            'assets/global/plugins/jquery.input-ip-address-control-1.0.min.js',
                            'assets/global/plugins/bootstrap-pwstrength/pwstrength-bootstrap.min.js',
                            'assets/global/plugins/bootstrap-switch/js/bootstrap-switch.min.js',
                            'assets/global/plugins/bootstrap-maxlength/bootstrap-maxlength.min.js',
                            'assets/global/plugins/bootstrap-touchspin/bootstrap.touchspin.js',
                            'assets/global/plugins/typeahead/handlebars.min.js',
                            'assets/global/plugins/typeahead/typeahead.bundle.min.js',
                            'assets/pages/scripts/components-form-tools-2.min.js',

                            'js/controllers/GeneralPageController.js'
                        ]
                    }]);
                }]
            }
        })

        // Date & Time Pickers
        .state('pickers', {
            url: "/pickers",
            templateUrl: "views/pickers.html",
            data: {pageTitle: 'Date & Time Pickers'},
            controller: "GeneralPageController",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load([{
                        name: 'CollateralApp',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before '#ng_load_plugins_before'
                        files: [
                            'assets/global/plugins/clockface/css/clockface.css',
                            'assets/global/plugins/bootstrap-datepicker/css/bootstrap-datepicker3.min.css',
                            'assets/global/plugins/bootstrap-timepicker/css/bootstrap-timepicker.min.css',
                            'assets/global/plugins/bootstrap-colorpicker/css/colorpicker.css',
                            'assets/global/plugins/bootstrap-datetimepicker/css/bootstrap-datetimepicker.min.css',

                            'assets/global/plugins/bootstrap-datepicker/js/bootstrap-datepicker.min.js',
                            'assets/global/plugins/bootstrap-timepicker/js/bootstrap-timepicker.min.js',
                            'assets/global/plugins/clockface/js/clockface.js',
                            'assets/global/plugins/bootstrap-colorpicker/js/bootstrap-colorpicker.js',
                            'assets/global/plugins/bootstrap-datetimepicker/js/bootstrap-datetimepicker.min.js',

                            'assets/pages/scripts/components-date-time-pickers.min.js',

                            'js/controllers/GeneralPageController.js'
                        ]
                    }]);
                }]
            }
        })

        // Custom Dropdowns
        .state('dropdowns', {
            url: "/dropdowns",
            templateUrl: "views/dropdowns.html",
            data: {pageTitle: 'Custom Dropdowns'},
            controller: "GeneralPageController",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load([{
                        name: 'CollateralApp',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before '#ng_load_plugins_before'
                        files: [
                            'assets/global/plugins/bootstrap-select/css/bootstrap-select.min.css',
                            'assets/global/plugins/select2/css/select2.min.css',
                            'assets/global/plugins/select2/css/select2-bootstrap.min.css',

                            'assets/global/plugins/bootstrap-select/js/bootstrap-select.min.js',
                            'assets/global/plugins/select2/js/select2.full.min.js',

                            'assets/pages/scripts/components-bootstrap-select.min.js',
                            'assets/pages/scripts/components-select2.min.js',

                            'js/controllers/GeneralPageController.js'
                        ]
                    }]);
                }]
            }
        })

        /* Advanced Datatables
        .state('datatablesAdvanced', {
            url: "/datatables/managed.html",
            templateUrl: "views/datatables/managed.html",
            data: {pageTitle: 'Advanced Datatables'},
            controller: "GeneralPageController",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'CollateralApp',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before '#ng_load_plugins_before'
                        files: [
                            'assets/global/plugins/datatables/datatables.min.css',
                            'assets/global/plugins/datatables/plugins/bootstrap/datatables.bootstrap.css',

                            'assets/global/plugins/datatables/datatables.all.min.js',

                            'assets/pages/scripts/table-datatables-managed.min.js',

                            'js/controllers/GeneralPageController.js'
                        ]
                    });
                }]
            }
        })

        // Ajax Datetables
        .state('datatablesAjax', {
            url: "/datatables/ajax.html",
            templateUrl: "views/datatables/ajax.html",
            data: {pageTitle: 'Ajax Datatables'},
            controller: "GeneralPageController",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'CollateralApp',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before '#ng_load_plugins_before'
                        files: [
                            'assets/global/plugins/datatables/datatables.min.css',
                            'assets/global/plugins/datatables/plugins/bootstrap/datatables.bootstrap.css',
                            'assets/global/plugins/bootstrap-datepicker/css/bootstrap-datepicker3.min.css',

                            'assets/global/plugins/datatables/datatables.all.min.js',
                            'assets/global/plugins/bootstrap-datepicker/js/bootstrap-datepicker.min.js',
                            'assets/global/scripts/datatable.min.js',

                            'js/scripts/table-ajax.js',
                            'js/controllers/GeneralPageController.js'
                        ]
                    });
                }]
            }
        })
        */
        // User Profile
        .state("profile", {
            url: "/profile",
            templateUrl: "views/profile/main.html",
            data: {pageTitle: 'User Profile'},
            controller: "UserProfileController",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'CollateralApp',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before '#ng_load_plugins_before'
                        files: [
                            'assets/global/plugins/bootstrap-fileinput/bootstrap-fileinput.css',
                            'assets/pages/css/profile.css',

                            'assets/global/plugins/jquery.sparkline.min.js',
                            'assets/global/plugins/bootstrap-fileinput/bootstrap-fileinput.js',

                            'assets/pages/scripts/profile.min.js',

                            'js/controllers/UserProfileController.js'
                        ]
                    });
                }]
            }
        })

        // User Profile Dashboard
        .state("profile.dashboard", {
            url: "/dashboard",
            templateUrl: "views/profile/dashboard.html",
            data: {pageTitle: 'User Profile'}
        })

        // User Profile Account
        .state("profile.account", {
            url: "/account",
            templateUrl: "views/profile/account.html",
            data: {pageTitle: 'User Account'}
        })

        // User Profile Help
        .state("profile.help", {
            url: "/help",
            templateUrl: "views/profile/help.html",
            data: {pageTitle: 'User Help'}
        })

        // Todo
        .state('todo', {
            url: "/todo",
            templateUrl: "views/todo.html",
            data: {pageTitle: 'Todo'},
            controller: "TodoController",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'CollateralApp',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before '#ng_load_plugins_before'
                        files: [
                            'assets/global/plugins/bootstrap-datepicker/css/bootstrap-datepicker3.min.css',
                            'assets/apps/css/todo-2.css',
                            'assets/global/plugins/select2/css/select2.min.css',
                            'assets/global/plugins/select2/css/select2-bootstrap.min.css',

                            'assets/global/plugins/select2/js/select2.full.min.js',

                            'assets/global/plugins/bootstrap-datepicker/js/bootstrap-datepicker.min.js',

                            'assets/apps/scripts/todo-2.min.js',

                            'js/controllers/TodoController.js'
                        ]
                    });
                }]
            }
        })

}]);

/* Init global settings and run the app */
CollateralApp.run(["$rootScope", "settings", "$state", function($rootScope, settings, $state) {
    $rootScope.$state = $state; // state to be accessed from view
    $rootScope.$settings = settings; // state to be accessed from view
    var msj = "Hi, Developer ^_^";
    console.log("%c"+msj,"font-size: 15px;font-weight: bold; color: darkblue;")
}]);