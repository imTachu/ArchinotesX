(function() {
    'use strict';

    angular
        .module('siccApp')
        .controller('ColaPeajeDetalleDeleteController',ColaPeajeDetalleDeleteController);

    ColaPeajeDetalleDeleteController.$inject = ['$uibModalInstance', 'entity', 'ColaPeajeDetalle'];

    function ColaPeajeDetalleDeleteController($uibModalInstance, entity, ColaPeajeDetalle) {
        var vm = this;
        vm.colaPeajeDetalle = entity;
        vm.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };
        vm.confirmDelete = function (id) {
            ColaPeajeDetalle.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        };
    }
})();
