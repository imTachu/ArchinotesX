(function() {
    'use strict';

    angular
        .module('archinotesxApp')
        .controller('EstadoBarreraContencionDeleteController',EstadoBarreraContencionDeleteController);

    EstadoBarreraContencionDeleteController.$inject = ['$uibModalInstance', 'entity', 'EstadoBarreraContencion'];

    function EstadoBarreraContencionDeleteController($uibModalInstance, entity, EstadoBarreraContencion) {
        var vm = this;
        vm.estadoBarreraContencion = entity;
        vm.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };
        vm.confirmDelete = function (id) {
            EstadoBarreraContencion.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        };
    }
})();
