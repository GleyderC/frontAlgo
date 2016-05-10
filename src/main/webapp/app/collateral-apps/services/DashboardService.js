'use strict';

/**
 * @ngdoc function
 * @name DashboardModele.services
 * @description
 * # scrollService
 * Service scroll
 */
DashboardApp.service('scrollService', ['$document',function ($document) {
    this.scrollToElement = function ($element) {
        var entityELement = angular.element(document.getElementById($element));
        $document.scrollToElementAnimated(entityELement);
    }
}]);