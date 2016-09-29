(function() {
    'use strict';

    angular
        .module('archinotesxApp')
        .controller('OcupacionCarrilesDeleteController',OcupacionCarrilesDeleteController);

    OcupacionCarrilesDeleteController.$inject = ['$uibModalInstance', 'entity', 'OcupacionCarriles'];

    function OcupacionCarrilesDeleteController($uibModalInstance, entity, OcupacionCarriles) {
        var vm = this;
        vm.ocupacionCarriles = entity;
        vm.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };
        vm.confirmDelete = function (id) {
            OcupacionCarriles.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        };
    }
})();
