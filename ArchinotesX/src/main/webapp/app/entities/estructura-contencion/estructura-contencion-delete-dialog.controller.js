(function() {
    'use strict';

    angular
        .module('siccApp')
        .controller('EstructuraContencionDeleteController',EstructuraContencionDeleteController);

    EstructuraContencionDeleteController.$inject = ['$uibModalInstance', 'entity', 'EstructuraContencion'];

    function EstructuraContencionDeleteController($uibModalInstance, entity, EstructuraContencion) {
        var vm = this;
        vm.estructuraContencion = entity;
        vm.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };
        vm.confirmDelete = function (id) {
            EstructuraContencion.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        };
    }
})();
