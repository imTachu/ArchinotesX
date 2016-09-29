(function() {
    'use strict';

    angular
        .module('archinotesxApp')
        .controller('CentroMedicoDeleteController',CentroMedicoDeleteController);

    CentroMedicoDeleteController.$inject = ['$uibModalInstance', 'entity', 'CentroMedico'];

    function CentroMedicoDeleteController($uibModalInstance, entity, CentroMedico) {
        var vm = this;
        vm.centroMedico = entity;
        vm.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };
        vm.confirmDelete = function (id) {
            CentroMedico.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        };
    }
})();
