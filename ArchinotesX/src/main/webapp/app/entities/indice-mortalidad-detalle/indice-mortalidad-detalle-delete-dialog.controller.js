(function() {
    'use strict';

    angular
        .module('siccApp')
        .controller('IndiceMortalidadDetalleDeleteController',IndiceMortalidadDetalleDeleteController);

    IndiceMortalidadDetalleDeleteController.$inject = ['$uibModalInstance', 'entity', 'IndiceMortalidadDetalle'];

    function IndiceMortalidadDetalleDeleteController($uibModalInstance, entity, IndiceMortalidadDetalle) {
        var vm = this;
        vm.indiceMortalidadDetalle = entity;
        vm.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };
        vm.confirmDelete = function (id) {
            IndiceMortalidadDetalle.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        };
    }
})();
