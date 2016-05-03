'use strict';

/**
 * @ngdoc function
 * @name collateralApp.services:menuService
 * @description
 * # menuService
 * Service of the collateralApp
 */
angular.module('collateralApp')

.service('menuService',function(){
    this.treeMenu = [
        {
            id          : "configuration", // required
            parent      : "#", // required
            text        : "Configuration", // node text
            icon        : "string", // string for custom
            state       : {
                opened    : boolean,  // is the node open
                disabled  : boolean , // is the node disabled
                selected  : boolean,  // is the node selected
            },
            li_attr     : {
                id : "",
                urlTemplate : "",
                text : "Legal Entity"
            },  // attributes for the generated LI node
            a_attr      : {}  // attributes for the generated A node
        },
        {
            id          : "Menu2", // required
            parent      : "#", // required
            text        : "Configuration", // node text
            icon        : "string", // string for custom
            state       : {
                opened    : boolean,  // is the node open
                disabled  : boolean , // is the node disabled
                selected  : boolean,  // is the node selected
            },
            li_attr     : {
                id : "",
                urlTemplate : "",
                text : "Legal Entity"
            },  // attributes for the generated LI node
            a_attr      : {}  // attributes for the generated A node
        }

    ];
    this.getMenu = function () {
        return treeMenu;
    }
    this.getMenuItem = function (index) {
        return treeMenu(index);
    }
})
