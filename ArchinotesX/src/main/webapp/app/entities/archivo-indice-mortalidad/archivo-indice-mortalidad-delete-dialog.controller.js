(function() {
    'use strict';

    angular
        .module('archinotesxApp')
        .controller('ArchivoIndiceMortalidadDeleteController',ArchivoIndiceMortalidadDeleteController);

    ArchivoIndiceMortalidadDeleteController.$inject = ['$uibModalInstance', 'entity', 'ArchivoIndiceMortalidad'];

    function ArchivoIndiceMortalidadDeleteController($uibModalInstance, entity, ArchivoIndiceMortalidad) {
        var vm = this;
        vm.archivoIndiceMortalidad = entity;
        vm.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };
        vm.confirmDelete = function (id) {
            ArchivoIndiceMortalidad.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        };
    }
})();
