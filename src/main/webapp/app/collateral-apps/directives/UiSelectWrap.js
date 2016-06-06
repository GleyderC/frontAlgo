angular.module('DashboardApp').directive( 'uiSelectWrap',function uiSelectWrap($document, uiGridEditConstants) {
        return {
            require: '?^uiGrid',
            link: link
        };

        function link($scope, $elm, $attr, uiGridCtrl) {
            $document.on('click', docClick);

            //set focus at start of edit
            $scope.$on(uiGridEditConstants.events.BEGIN_CELL_EDIT, function (evt, args) {
                hideOnCellnav();
            });

            function hideOnCellnav() {
                if (uiGridCtrl && uiGridCtrl.grid.api.cellNav) {
                    var dereg = uiGridCtrl.grid.api.cellNav.on.navigate($scope, function (newRowCol, oldRowCol) {
                        if ($scope.col.colDef.enableCellEditOnFocus) {
                            if (newRowCol.row !== $scope.row || newRowCol.col !== $scope.col) {
                                $scope.$emit(uiGridEditConstants.events.END_CELL_EDIT);
                                dereg();
                            }
                        }
                    });
                }
            }

            function docClick(evt) {
                if ($(evt.target).closest('.ui-select-container').size() === 0) {
                    $scope.$emit(uiGridEditConstants.events.END_CELL_EDIT);
                    $document.off('click', docClick);
                }
            }
        }
    }
)