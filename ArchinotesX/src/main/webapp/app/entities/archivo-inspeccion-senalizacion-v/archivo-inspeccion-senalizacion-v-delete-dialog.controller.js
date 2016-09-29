(function() {
    'use strict';

    angular
        .module('archinotesxApp')
        .controller('ArchivoInspeccionSenalizacionVDeleteController',ArchivoInspeccionSenalizacionVDeleteController);

    ArchivoInspeccionSenalizacionVDeleteController.$inject = ['$uibModalInstance', 'entity', 'ArchivoInspeccionSenalizacionV'];

    function ArchivoInspeccionSenalizacionVDeleteController($uibModalInstance, entity, ArchivoInspeccionSenalizacionV) {
        var vm = this;
        vm.archivoInspeccionSenalizacionV = entity;
        vm.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };
        vm.confirmDelete = function (id) {
            ArchivoInspeccionSenalizacionV.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        };
    }
})();
