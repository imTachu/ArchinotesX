(function() {
    'use strict';

    angular
        .module('siccApp')
        .controller('InspeccionSenalizacionHDeleteController',InspeccionSenalizacionHDeleteController);

    InspeccionSenalizacionHDeleteController.$inject = ['$uibModalInstance', 'entity', 'InspeccionSenalizacionH'];

    function InspeccionSenalizacionHDeleteController($uibModalInstance, entity, InspeccionSenalizacionH) {
        var vm = this;
        vm.inspeccionSenalizacionH = entity;
        vm.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };
        vm.confirmDelete = function (id) {
            InspeccionSenalizacionH.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        };
    }
})();
