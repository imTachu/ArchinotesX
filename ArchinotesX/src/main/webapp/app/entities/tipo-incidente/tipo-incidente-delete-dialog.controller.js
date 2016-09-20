(function() {
    'use strict';

    angular
        .module('siccApp')
        .controller('TipoIncidenteDeleteController',TipoIncidenteDeleteController);

    TipoIncidenteDeleteController.$inject = ['$uibModalInstance', 'entity', 'TipoIncidente'];

    function TipoIncidenteDeleteController($uibModalInstance, entity, TipoIncidente) {
        var vm = this;
        vm.tipoIncidente = entity;
        vm.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };
        vm.confirmDelete = function (id) {
            TipoIncidente.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        };
    }
})();
