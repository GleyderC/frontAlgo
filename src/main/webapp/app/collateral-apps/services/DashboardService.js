'use strict';

/**
 * @ngdoc function
 * @name DashboardModele.services
 * @description
 * # scrollService
 * Service scroll
 */
DashboardApp.service('elementService', ['$document',function ($document) {
    this.scrollToElement = function (element,offset) {
        var entityELement = angular.element($("#"+element));
        $document.scrollToElement(entityELement, offset, 1000);
    }

    this.collapsePortlet = function (element) {
        $("#"+element+" .portlet-title .collapse").click();
    }

    this.expandPortlet = function (element) {
        $("#"+element+" .portlet-title .expand").click();
    }
}]);
