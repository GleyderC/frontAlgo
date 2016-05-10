'use strict';

/**
 * @ngdoc function
 * @name DashboardModele.services
 * @description
 * # scrollService
 * Service scroll
 */
DashboardApp.service('scrollService', ['$document',function ($document) {
    this.scrollToElement = function (element,offset) {
        var entityELement = angular.element($("#"+element));
        $document.scrollToElement(entityELement,offset,1000);
    }
}]);