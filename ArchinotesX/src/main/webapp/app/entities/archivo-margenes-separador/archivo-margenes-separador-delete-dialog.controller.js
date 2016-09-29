(function() {
    'use strict';

    angular
        .module('archinotesxApp')
        .controller('ArchivoMargenesSeparadorDeleteController',ArchivoMargenesSeparadorDeleteController);

    ArchivoMargenesSeparadorDeleteController.$inject = ['$uibModalInstance', 'entity', 'ArchivoMargenesSeparador'];

    function ArchivoMargenesSeparadorDeleteController($uibModalInstance, entity, ArchivoMargenesSeparador) {
        var vm = this;
        vm.archivoMargenesSeparador = entity;
        vm.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };
        vm.confirmDelete = function (id) {
            ArchivoMargenesSeparador.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        };
    }
})();
