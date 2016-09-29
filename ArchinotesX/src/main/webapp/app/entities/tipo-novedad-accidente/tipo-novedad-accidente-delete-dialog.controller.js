(function() {
    'use strict';

    angular
        .module('archinotesxApp')
        .controller('TipoNovedadAccidenteDeleteController',TipoNovedadAccidenteDeleteController);

    TipoNovedadAccidenteDeleteController.$inject = ['$uibModalInstance', 'entity', 'TipoNovedadAccidente'];

    function TipoNovedadAccidenteDeleteController($uibModalInstance, entity, TipoNovedadAccidente) {
        var vm = this;
        vm.tipoNovedadAccidente = entity;
        vm.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };
        vm.confirmDelete = function (id) {
            TipoNovedadAccidente.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        };
    }
})();
