(function() {
    'use strict';

    angular
        .module('archinotesxApp')
        .controller('ArchivoInspeccionDrenajesDeleteController',ArchivoInspeccionDrenajesDeleteController);

    ArchivoInspeccionDrenajesDeleteController.$inject = ['$uibModalInstance', 'entity', 'ArchivoInspeccionDrenajes'];

    function ArchivoInspeccionDrenajesDeleteController($uibModalInstance, entity, ArchivoInspeccionDrenajes) {
        var vm = this;
        vm.archivoInspeccionDrenajes = entity;
        vm.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };
        vm.confirmDelete = function (id) {
            ArchivoInspeccionDrenajes.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        };
    }
})();
