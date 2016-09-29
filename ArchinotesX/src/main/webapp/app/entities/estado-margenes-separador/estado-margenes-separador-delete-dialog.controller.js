(function() {
    'use strict';

    angular
        .module('archinotesxApp')
        .controller('EstadoMargenesSeparadorDeleteController',EstadoMargenesSeparadorDeleteController);

    EstadoMargenesSeparadorDeleteController.$inject = ['$uibModalInstance', 'entity', 'EstadoMargenesSeparador'];

    function EstadoMargenesSeparadorDeleteController($uibModalInstance, entity, EstadoMargenesSeparador) {
        var vm = this;
        vm.estadoMargenesSeparador = entity;
        vm.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };
        vm.confirmDelete = function (id) {
            EstadoMargenesSeparador.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        };
    }
})();
