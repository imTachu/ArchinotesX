(function() {
    'use strict';

    angular
        .module('siccApp')
        .controller('ArchivoAccidenteDeleteController',ArchivoAccidenteDeleteController);

    ArchivoAccidenteDeleteController.$inject = ['$uibModalInstance', 'entity', 'ArchivoAccidente'];

    function ArchivoAccidenteDeleteController($uibModalInstance, entity, ArchivoAccidente) {
        var vm = this;
        vm.archivoAccidente = entity;
        vm.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };
        vm.confirmDelete = function (id) {
            ArchivoAccidente.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        };
    }
})();
