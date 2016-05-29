angular.module('DashboardApp')
    .factory('RowEditorModalService',[ '$uibModal', function ($uibModal) {
    var service = {};
    service.editRow = editRow;

    function editRow(grid, row) {
        //console.log(row);
        $uibModal.open({
            templateUrl: 'edit-modal-contact.html',
            size: 'lg',
            backdrop: false,
            controller: ['$scope', '$uibModalInstance', 'grid', 'row', RowEditCtrl],
            controllerAs: 'vm',
            resolve: {
                grid: function () {
                    return grid;
                },
                row: function () {
                    return row;
                }
            }
        });

    }
    return service;
}]);