(function() {
    'use strict';

    angular
        .module('archinotesxApp')
        .controller('InspeccionSenalizacionVDeleteController',InspeccionSenalizacionVDeleteController);

    InspeccionSenalizacionVDeleteController.$inject = ['$uibModalInstance', 'entity', 'InspeccionSenalizacionV'];

    function InspeccionSenalizacionVDeleteController($uibModalInstance, entity, InspeccionSenalizacionV) {
        var vm = this;
        vm.inspeccionSenalizacionV = entity;
        vm.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };
        vm.confirmDelete = function (id) {
            InspeccionSenalizacionV.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        };
    }
})();
