(function() {
    'use strict';

    angular
        .module('siccApp')
        .controller('InspeccionDesportillamientoDeleteController',InspeccionDesportillamientoDeleteController);

    InspeccionDesportillamientoDeleteController.$inject = ['$uibModalInstance', 'entity', 'InspeccionDesportillamiento'];

    function InspeccionDesportillamientoDeleteController($uibModalInstance, entity, InspeccionDesportillamiento) {
        var vm = this;
        vm.inspeccionDesportillamiento = entity;
        vm.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };
        vm.confirmDelete = function (id) {
            InspeccionDesportillamiento.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        };
    }
})();
