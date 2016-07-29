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
    'ngWebSocket',
    'angular-md5',
    "LocalStorageModule",
    "toastr",
    "ui.utils.masks",
    "shagstrom.angular-split-pane"
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
    request.getFile = function(urlRelative){
    	window.open(URL_CONFIG.API_URL+''+urlRelative,"_blank");
    };
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

/*Web socket connection */
CollateralApp.factory('$socket',['$websocket', '$rootScope','$http','URL_CONFIG','$log','localStorageService',
                         function($websocket,$rootScope,$http, URL_CONFIG, $log,localStorage){
		var ws  = $websocket(URL_CONFIG.WS_URL);
		ws.onOpen(function(){
            		console.debug("Socket Connected");
//            		ws.send(JSON.stringify({signal : "SGN_USER_NAME" , userName : localStorage.get("userName")}));
            		ws.send(JSON.stringify({signal : "SGN_USER_NAME" , userName : "userName"}));
            });
		
	return ws ;
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

                            /* select css*/
                            'assets/vendor/select2/select2.css',
                            'assets/vendor/selectize/dist/css/selectize.css',
                            'assets/vendor/angular-ui-select/dist/select.min.css',
                            'assets/vendor/multiselect/css/multi-select.css',

                            /* select js*/
                            //'assets/vendor/select2/dist/js/select2.full.min.js',
                            'assets/vendor/angular-ui-select/dist/select.min.js',
                            'assets/vendor/multiselect/js/jquery.multi-select.js',

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
                            'collateral-apps/services/ArrayService.js',
                            'collateral-apps/services/RowEditorModalService.js',
                            'collateral-apps/services/ModalService.js',


                            'collateral-apps/services/collateral/MarginCallService.js',
                            'collateral-apps/services/collateral/AgreementsService.js',
                            'collateral-apps/services/collateral/InterestService.js',

                            'collateral-apps/services/configuration/LegalEntityService.js',
                            'collateral-apps/services/configuration/BilateralContractService.js',
                            'collateral-apps/services/configuration/SecurityService.js',
                            'collateral-apps/services/configuration/IntegrationService.js',

                            'collateral-apps/services/user_message/UserMessageService.js',

                            'collateral-apps/services/risk/RiskService.js',

                            /* Legal Entity Controller js */
                            'collateral-apps/controllers/configuration/LegalEntityController.js',
                            /* Bilateral Controller js */
                            'collateral-apps/controllers/configuration/BilateralAgreementsController.js',
                            /* Security Controller*/
                            'collateral-apps/controllers/configuration/SecurityController.js',
                            /* Integration Controller*/
                            'collateral-apps/controllers/configuration/IntegrationController.js',

                            /* Agreements Controller js */
                            'collateral-apps/controllers/collateral/agreements/AgreementsController.js',
                            /* Margin Call Controller js */
                            'collateral-apps/controllers/collateral/margin_call/MarginCallController.js',
                            'collateral-apps/controllers/collateral/margin_call/MarginCallDetailController.js',
                            'collateral-apps/controllers/collateral/margin_call/MarginCallTradesController.js',
                            'collateral-apps/controllers/collateral/margin_call/MarginCallCsaController.js',
                            'collateral-apps/controllers/collateral/margin_call/MarginCallPoolController.js',
                            'collateral-apps/controllers/collateral/margin_call/MarginCallInventoryController.js',
                            'collateral-apps/controllers/collateral/margin_call/MarginCallMessagingRepository.js',
                            /* Interest Controller js */
                            'collateral-apps/controllers/collateral/interest/InterestController.js',
                            'collateral-apps/controllers/collateral/interest/InterestDetailController.js',
                            
                            /*UserMessage Controller*/
                            'collateral-apps/controllers/user_message/UserMessageController.js',
                            /*UserMessage Controller*/
                            'collateral-apps/controllers/NotificationsController.js',

                            /*IssuerRisk Controller*/
                            'collateral-apps/controllers/risk/IssuerRiskController.js',
                            'collateral-apps/controllers/risk/CountryRiskController.js'

                        ],
                        serie: true,
                        cache: false
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