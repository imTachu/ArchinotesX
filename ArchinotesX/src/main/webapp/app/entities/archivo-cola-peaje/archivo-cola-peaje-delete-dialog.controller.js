(function() {
    'use strict';

    angular
        .module('siccApp')
        .controller('ArchivoColaPeajeDeleteController',ArchivoColaPeajeDeleteController);

    ArchivoColaPeajeDeleteController.$inject = ['$uibModalInstance', 'entity', 'ArchivoColaPeaje'];

    function ArchivoColaPeajeDeleteController($uibModalInstance, entity, ArchivoColaPeaje) {
        var vm = this;
        vm.archivoColaPeaje = entity;
        vm.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };
        vm.confirmDelete = function (id) {
            ArchivoColaPeaje.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        };
    }
})();
