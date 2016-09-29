(function() {
    'use strict';

    angular
        .module('archinotesxApp')
        .controller('InspeccionMargenesSeparadorDeleteController',InspeccionMargenesSeparadorDeleteController);

    InspeccionMargenesSeparadorDeleteController.$inject = ['$uibModalInstance', 'entity', 'InspeccionMargenesSeparador'];

    function InspeccionMargenesSeparadorDeleteController($uibModalInstance, entity, InspeccionMargenesSeparador) {
        var vm = this;
        vm.inspeccionMargenesSeparador = entity;
        vm.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };
        vm.confirmDelete = function (id) {
            InspeccionMargenesSeparador.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        };
    }
})();
