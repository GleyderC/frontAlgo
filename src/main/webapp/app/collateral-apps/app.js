'use strict';

/**
 * @ngdoc overview
 * @name collateralApp
 * @description
 * # collateralApp
 *
 * Main module of the application.
 */

var paths = {

    views: "collateral-apps/views"
};

var collateralApp = angular
    .module('CollateralApp', [
        'ngAnimate',
        'ngCookies',
        'ngResource',
        'ui.router',
        'ngSanitize',
        'ngTouch',
        'ui.bootstrap',
        'oc.lazyLoad'
    ])
    .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
        $stateProvider

        //route for the home page
            .state('login', {
                url: '/login',
                views: {
                    'content@': {
                        templateUrl: paths.views + '/login/user_login.jsp',
                        controller: 'LoginController',
                        controllerAs: 'loginCtrl'
                    }
                }
            })
            .state('app', {
                abstract: true
            })
            //route for the aboutus page
            .state('app.dashboard', {
                url: '/dashboard',
                views: {
                    'content@': {
                        templateUrl: paths.views + '/dashboard/dashboard.jsp',
                        controller: 'DashboardController',
                        controllerAs: 'dashboardCtrl'
                    },
                }
            });

        $urlRouterProvider.otherwise('login');
    }]);