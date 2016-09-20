(function() {
    'use strict';

    angular
        .module('siccApp')
        .controller('VehiculoAfectadoEnIncidenteDeleteController',VehiculoAfectadoEnIncidenteDeleteController);

    VehiculoAfectadoEnIncidenteDeleteController.$inject = ['$uibModalInstance', 'entity', 'VehiculoAfectadoEnIncidente'];

    function VehiculoAfectadoEnIncidenteDeleteController($uibModalInstance, entity, VehiculoAfectadoEnIncidente) {
        var vm = this;
        vm.vehiculoAfectadoEnIncidente = entity;
        vm.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };
        vm.confirmDelete = function (id) {
            VehiculoAfectadoEnIncidente.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        };
    }
})();
