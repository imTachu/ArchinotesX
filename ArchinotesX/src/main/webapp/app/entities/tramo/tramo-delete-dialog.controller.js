(function() {
    'use strict';

    angular
        .module('siccApp')
        .controller('TramoDeleteController',TramoDeleteController);

    TramoDeleteController.$inject = ['$uibModalInstance', 'entity', 'Tramo'];

    function TramoDeleteController($uibModalInstance, entity, Tramo) {
        var vm = this;
        vm.tramo = entity;
        vm.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };
        vm.confirmDelete = function (id) {
            Tramo.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        };
    }
})();
