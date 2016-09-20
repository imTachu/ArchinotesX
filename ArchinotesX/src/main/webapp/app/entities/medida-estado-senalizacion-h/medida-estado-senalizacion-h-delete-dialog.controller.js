(function() {
    'use strict';

    angular
        .module('siccApp')
        .controller('MedidaEstadoSenalizacionHDeleteController',MedidaEstadoSenalizacionHDeleteController);

    MedidaEstadoSenalizacionHDeleteController.$inject = ['$uibModalInstance', 'entity', 'MedidaEstadoSenalizacionH'];

    function MedidaEstadoSenalizacionHDeleteController($uibModalInstance, entity, MedidaEstadoSenalizacionH) {
        var vm = this;
        vm.medidaEstadoSenalizacionH = entity;
        vm.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };
        vm.confirmDelete = function (id) {
            MedidaEstadoSenalizacionH.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        };
    }
})();
