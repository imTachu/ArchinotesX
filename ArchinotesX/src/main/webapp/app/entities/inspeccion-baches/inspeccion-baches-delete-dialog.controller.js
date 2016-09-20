(function() {
    'use strict';

    angular
        .module('siccApp')
        .controller('InspeccionBachesDeleteController',InspeccionBachesDeleteController);

    InspeccionBachesDeleteController.$inject = ['$uibModalInstance', 'entity', 'InspeccionBaches'];

    function InspeccionBachesDeleteController($uibModalInstance, entity, InspeccionBaches) {
        var vm = this;
        vm.inspeccionBaches = entity;
        vm.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };
        vm.confirmDelete = function (id) {
            InspeccionBaches.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        };
    }
})();
