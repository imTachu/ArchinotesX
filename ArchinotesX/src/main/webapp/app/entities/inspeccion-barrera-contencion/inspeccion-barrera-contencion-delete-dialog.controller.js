(function() {
    'use strict';

    angular
        .module('siccApp')
        .controller('InspeccionBarreraContencionDeleteController',InspeccionBarreraContencionDeleteController);

    InspeccionBarreraContencionDeleteController.$inject = ['$uibModalInstance', 'entity', 'InspeccionBarreraContencion'];

    function InspeccionBarreraContencionDeleteController($uibModalInstance, entity, InspeccionBarreraContencion) {
        var vm = this;
        vm.inspeccionBarreraContencion = entity;
        vm.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };
        vm.confirmDelete = function (id) {
            InspeccionBarreraContencion.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        };
    }
})();
