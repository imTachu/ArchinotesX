(function() {
    'use strict';

    angular
        .module('archinotesxApp')
        .controller('TipoAfectacionPersonaDeleteController',TipoAfectacionPersonaDeleteController);

    TipoAfectacionPersonaDeleteController.$inject = ['$uibModalInstance', 'entity', 'TipoAfectacionPersona'];

    function TipoAfectacionPersonaDeleteController($uibModalInstance, entity, TipoAfectacionPersona) {
        var vm = this;
        vm.tipoAfectacionPersona = entity;
        vm.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };
        vm.confirmDelete = function (id) {
            TipoAfectacionPersona.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        };
    }
})();
