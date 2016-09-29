(function() {
    'use strict';

    angular
        .module('archinotesxApp')
        .controller('EstadoSenalizacionVDeleteController',EstadoSenalizacionVDeleteController);

    EstadoSenalizacionVDeleteController.$inject = ['$uibModalInstance', 'entity', 'EstadoSenalizacionV'];

    function EstadoSenalizacionVDeleteController($uibModalInstance, entity, EstadoSenalizacionV) {
        var vm = this;
        vm.estadoSenalizacionV = entity;
        vm.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };
        vm.confirmDelete = function (id) {
            EstadoSenalizacionV.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        };
    }
})();
