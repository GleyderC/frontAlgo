//Build Menu
DashboardApp.directive('menuCollateral', ['$rootScope', function ($rootScope) {
    return {
        restrict: "AE",
        templateUrl: "collateral-apps/tpl/MenuCollateral.html",
        link: function(scope, iElem, iAttrs){
            
        }
    }
}]);

DashboardApp.service('MenuService', [function(){
    this.MenuTree = [
        {
            head: {
                icon: 'glyphicon glyphicon-refresh glyphicon-refresh-animate',
                text: ''
            },
            content: '',
            templateUrl: '',
            childrenTabs: [
                {
                    head: {
                        icon: 'glyphicon glyphicon-refresh glyphicon-refresh-animate',
                        text: ''
                    },
                    content: '',
                    templateUrl: '',
                    childrenTabs: [],
                    resolve: {
                        formData: []
                    },
                    disabled: false,
                    closable: false,
                    callback: function () {
                    }
                }
            ],
            resolve: {
                formData: []
            },
            disabled: false,
            closable: false,
            callback: function () {
            }
        }
    ]
}]);