(function() {
    'use strict';

    angular
        .module('archinotesxApp')
        .controller('ArchivoInspeccionBarreraDeleteController',ArchivoInspeccionBarreraDeleteController);

    ArchivoInspeccionBarreraDeleteController.$inject = ['$uibModalInstance', 'entity', 'ArchivoInspeccionBarrera'];

    function ArchivoInspeccionBarreraDeleteController($uibModalInstance, entity, ArchivoInspeccionBarrera) {
        var vm = this;
        vm.archivoInspeccionBarrera = entity;
        vm.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };
        vm.confirmDelete = function (id) {
            ArchivoInspeccionBarrera.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        };
    }
})();
