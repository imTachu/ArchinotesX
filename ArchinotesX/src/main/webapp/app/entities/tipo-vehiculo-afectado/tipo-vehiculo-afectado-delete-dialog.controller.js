(function() {
    'use strict';

    angular
        .module('siccApp')
        .controller('TipoVehiculoAfectadoDeleteController',TipoVehiculoAfectadoDeleteController);

    TipoVehiculoAfectadoDeleteController.$inject = ['$uibModalInstance', 'entity', 'TipoVehiculoAfectado'];

    function TipoVehiculoAfectadoDeleteController($uibModalInstance, entity, TipoVehiculoAfectado) {
        var vm = this;
        vm.tipoVehiculoAfectado = entity;
        vm.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };
        vm.confirmDelete = function (id) {
            TipoVehiculoAfectado.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        };
    }
})();
