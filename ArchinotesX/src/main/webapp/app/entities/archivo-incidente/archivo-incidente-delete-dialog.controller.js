(function() {
    'use strict';

    angular
        .module('siccApp')
        .controller('ArchivoIncidenteDeleteController',ArchivoIncidenteDeleteController);

    ArchivoIncidenteDeleteController.$inject = ['$uibModalInstance', 'entity', 'ArchivoIncidente'];

    function ArchivoIncidenteDeleteController($uibModalInstance, entity, ArchivoIncidente) {
        var vm = this;
        vm.archivoIncidente = entity;
        vm.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };
        vm.confirmDelete = function (id) {
            ArchivoIncidente.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        };
    }
})();
