(function() {
    'use strict';

    angular
        .module('siccApp')
        .controller('VehiculoDeApoyoIncidenteDeleteController',VehiculoDeApoyoIncidenteDeleteController);

    VehiculoDeApoyoIncidenteDeleteController.$inject = ['$uibModalInstance', 'entity', 'VehiculoDeApoyoIncidente'];

    function VehiculoDeApoyoIncidenteDeleteController($uibModalInstance, entity, VehiculoDeApoyoIncidente) {
        var vm = this;
        vm.vehiculoDeApoyoIncidente = entity;
        vm.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };
        vm.confirmDelete = function (id) {
            VehiculoDeApoyoIncidente.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        };
    }
})();
