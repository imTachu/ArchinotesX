(function() {
    'use strict';

    angular
        .module('siccApp')
        .controller('VehiculoAfectadoEnAccidenteDeleteController',VehiculoAfectadoEnAccidenteDeleteController);

    VehiculoAfectadoEnAccidenteDeleteController.$inject = ['$uibModalInstance', 'entity', 'VehiculoAfectadoEnAccidente'];

    function VehiculoAfectadoEnAccidenteDeleteController($uibModalInstance, entity, VehiculoAfectadoEnAccidente) {
        var vm = this;
        vm.vehiculoAfectadoEnAccidente = entity;
        vm.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };
        vm.confirmDelete = function (id) {
            VehiculoAfectadoEnAccidente.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        };
    }
})();
