(function() {
    'use strict';

    angular
        .module('siccApp')
        .controller('ArchivoInspeccionDesportillamientoDeleteController',ArchivoInspeccionDesportillamientoDeleteController);

    ArchivoInspeccionDesportillamientoDeleteController.$inject = ['$uibModalInstance', 'entity', 'ArchivoInspeccionDesportillamiento'];

    function ArchivoInspeccionDesportillamientoDeleteController($uibModalInstance, entity, ArchivoInspeccionDesportillamiento) {
        var vm = this;
        vm.archivoInspeccionDesportillamiento = entity;
        vm.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };
        vm.confirmDelete = function (id) {
            ArchivoInspeccionDesportillamiento.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        };
    }
})();
