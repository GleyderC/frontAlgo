'use strict';

/**
 * @ngdoc overview
 * @name collateralApp
 * @description
 * # collateralApp
 *
 * Main module of the application.
 */
angular
    .module('collateralApp', [
        'ngAnimate',
        'ngCookies',
        'ngResource',
        'ui.router',
        'ngSanitize',
        'ngTouch'
    ])
    .config(function ($stateProvider, $urlRouterProvider) {
        $stateProvider

        //route for the home page
            .state('login', {
                url: '/login',
                views: {
                    'header': {
                        templateUrl: 'views/header.jsp',
                    },
                    'content@': {
                        templateUrl: 'views/login/user_login.jsp',
                        controller: 'LoginController'
                    },
                    'footer': {
                        templateUrl: 'views/footer.jsp'
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
                        templateUrl: 'views/dashboard/dashboard.jsp',
                        controller: 'DashboardController'
                    },
                }
            });

        $urlRouterProvider.otherwise('login');
    })
/*.config(function ($routeProvider) {
 $routeProvider
 .when('/', {
 templateUrl: 'views/main.html',
 controller: 'MainCtrl',
 controllerAs: 'main'
 })
 .when('/about', {
 templateUrl: 'views/about.html',
 controller: 'AboutCtrl',
 controllerAs: 'about'
 })
 .otherwise({
 redirectTo: '/'
 });
 });
 */
