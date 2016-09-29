(function() {
    'use strict';

    angular
        .module('archinotesxApp')
        .controller('InfraestructuraAfectadaDeleteController',InfraestructuraAfectadaDeleteController);

    InfraestructuraAfectadaDeleteController.$inject = ['$uibModalInstance', 'entity', 'InfraestructuraAfectada'];

    function InfraestructuraAfectadaDeleteController($uibModalInstance, entity, InfraestructuraAfectada) {
        var vm = this;
        vm.infraestructuraAfectada = entity;
        vm.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };
        vm.confirmDelete = function (id) {
            InfraestructuraAfectada.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        };
    }
})();
