(function() {
    'use strict';

    angular
        .module('archinotesxApp')
        .controller('TipoAccidenteDeleteController',TipoAccidenteDeleteController);

    TipoAccidenteDeleteController.$inject = ['$uibModalInstance', 'entity', 'TipoAccidente'];

    function TipoAccidenteDeleteController($uibModalInstance, entity, TipoAccidente) {
        var vm = this;
        vm.tipoAccidente = entity;
        vm.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };
        vm.confirmDelete = function (id) {
            TipoAccidente.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        };
    }
})();
