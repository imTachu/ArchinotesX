(function() {
    'use strict';

    angular
        .module('archinotesxApp')
        .controller('PeajeDeleteController',PeajeDeleteController);

    PeajeDeleteController.$inject = ['$uibModalInstance', 'entity', 'Peaje'];

    function PeajeDeleteController($uibModalInstance, entity, Peaje) {
        var vm = this;
        vm.peaje = entity;
        vm.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };
        vm.confirmDelete = function (id) {
            Peaje.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        };
    }
})();
