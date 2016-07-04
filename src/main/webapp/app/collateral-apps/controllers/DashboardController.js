angular.module('CollateralApp').controller('DashboardController',
    [
        '$rootScope',
        '$scope',
        '$request',
        '$socket',
        'localStorageService',
        'MenuService',
        function ($rootScope, $scope, $request,$socket, localStorageService, $menuService) {

            $scope.$workspaceTabsMgm = $menuService.MenuTree;

            //GET STATIC DATA FROM THE SERVER
            $request.get("/servlet/StaticData/SelectAll").then(function (response) {
                angular.forEach(response.data.dataResponse, function (obj, key) {
                    localStorageService.set(obj.type, obj.value);
                });
            });

            $scope.$on('$includeContentLoaded', function () {
                App.initAjax();
                $(".go2top").show();
            });

            // set sidebar closed and body solid layout mode
            $rootScope.settings.layout.pageContentWhite = true;
            $rootScope.settings.layout.pageBodySolid = false;
            $rootScope.settings.layout.pageSidebarClosed = false;
        }]);
