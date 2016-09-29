(function() {
    'use strict';

    angular
        .module('archinotesxApp')
        .controller('VehiculoDeApoyoAccidenteDeleteController',VehiculoDeApoyoAccidenteDeleteController);

    VehiculoDeApoyoAccidenteDeleteController.$inject = ['$uibModalInstance', 'entity', 'VehiculoDeApoyoAccidente'];

    function VehiculoDeApoyoAccidenteDeleteController($uibModalInstance, entity, VehiculoDeApoyoAccidente) {
        var vm = this;
        vm.vehiculoDeApoyoAccidente = entity;
        vm.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };
        vm.confirmDelete = function (id) {
            VehiculoDeApoyoAccidente.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        };
    }
})();
