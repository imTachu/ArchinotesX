(function() {
    'use strict';

    angular
        .module('siccApp')
        .controller('ArchivoInspeccionSenalizacionHDeleteController',ArchivoInspeccionSenalizacionHDeleteController);

    ArchivoInspeccionSenalizacionHDeleteController.$inject = ['$uibModalInstance', 'entity', 'ArchivoInspeccionSenalizacionH'];

    function ArchivoInspeccionSenalizacionHDeleteController($uibModalInstance, entity, ArchivoInspeccionSenalizacionH) {
        var vm = this;
        vm.archivoInspeccionSenalizacionH = entity;
        vm.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };
        vm.confirmDelete = function (id) {
            ArchivoInspeccionSenalizacionH.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        };
    }
})();
