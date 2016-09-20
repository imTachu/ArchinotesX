(function() {
    'use strict';

    angular
        .module('siccApp')
        .controller('ArchivoInspeccionBachesDeleteController',ArchivoInspeccionBachesDeleteController);

    ArchivoInspeccionBachesDeleteController.$inject = ['$uibModalInstance', 'entity', 'ArchivoInspeccionBaches'];

    function ArchivoInspeccionBachesDeleteController($uibModalInstance, entity, ArchivoInspeccionBaches) {
        var vm = this;
        vm.archivoInspeccionBaches = entity;
        vm.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };
        vm.confirmDelete = function (id) {
            ArchivoInspeccionBaches.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        };
    }
})();
