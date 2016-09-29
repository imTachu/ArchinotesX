(function() {
    'use strict';

    angular
        .module('archinotesxApp')
        .controller('OcupacionCarrilesDetalleDeleteController',OcupacionCarrilesDetalleDeleteController);

    OcupacionCarrilesDetalleDeleteController.$inject = ['$uibModalInstance', 'entity', 'OcupacionCarrilesDetalle'];

    function OcupacionCarrilesDetalleDeleteController($uibModalInstance, entity, OcupacionCarrilesDetalle) {
        var vm = this;
        vm.ocupacionCarrilesDetalle = entity;
        vm.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };
        vm.confirmDelete = function (id) {
            OcupacionCarrilesDetalle.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        };
    }
})();
