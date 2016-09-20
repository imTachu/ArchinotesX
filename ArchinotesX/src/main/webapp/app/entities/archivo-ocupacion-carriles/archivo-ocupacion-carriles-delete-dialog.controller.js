(function() {
    'use strict';

    angular
        .module('siccApp')
        .controller('ArchivoOcupacionCarrilesDeleteController',ArchivoOcupacionCarrilesDeleteController);

    ArchivoOcupacionCarrilesDeleteController.$inject = ['$uibModalInstance', 'entity', 'ArchivoOcupacionCarriles'];

    function ArchivoOcupacionCarrilesDeleteController($uibModalInstance, entity, ArchivoOcupacionCarriles) {
        var vm = this;
        vm.archivoOcupacionCarriles = entity;
        vm.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };
        vm.confirmDelete = function (id) {
            ArchivoOcupacionCarriles.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        };
    }
})();
