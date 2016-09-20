(function() {
    'use strict';

    angular
        .module('siccApp')
        .controller('EstadoBachesDeleteController',EstadoBachesDeleteController);

    EstadoBachesDeleteController.$inject = ['$uibModalInstance', 'entity', 'EstadoBaches'];

    function EstadoBachesDeleteController($uibModalInstance, entity, EstadoBaches) {
        var vm = this;
        vm.estadoBaches = entity;
        vm.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };
        vm.confirmDelete = function (id) {
            EstadoBaches.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        };
    }
})();
