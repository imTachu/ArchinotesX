(function() {
    'use strict';

    angular
        .module('archinotesxApp')
        .controller('EstadoSenalizacionHDeleteController',EstadoSenalizacionHDeleteController);

    EstadoSenalizacionHDeleteController.$inject = ['$uibModalInstance', 'entity', 'EstadoSenalizacionH'];

    function EstadoSenalizacionHDeleteController($uibModalInstance, entity, EstadoSenalizacionH) {
        var vm = this;
        vm.estadoSenalizacionH = entity;
        vm.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };
        vm.confirmDelete = function (id) {
            EstadoSenalizacionH.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        };
    }
})();
