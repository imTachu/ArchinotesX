(function() {
    'use strict';

    angular
        .module('archinotesxApp')
        .controller('InspeccionDrenajesDeleteController',InspeccionDrenajesDeleteController);

    InspeccionDrenajesDeleteController.$inject = ['$uibModalInstance', 'entity', 'InspeccionDrenajes'];

    function InspeccionDrenajesDeleteController($uibModalInstance, entity, InspeccionDrenajes) {
        var vm = this;
        vm.inspeccionDrenajes = entity;
        vm.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };
        vm.confirmDelete = function (id) {
            InspeccionDrenajes.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        };
    }
})();
