(function() {
    'use strict';

    angular
        .module('siccApp')
        .controller('IncidenteDeleteController',IncidenteDeleteController);

    IncidenteDeleteController.$inject = ['$uibModalInstance', 'entity', 'Incidente'];

    function IncidenteDeleteController($uibModalInstance, entity, Incidente) {
        var vm = this;
        vm.incidente = entity;
        vm.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };
        vm.confirmDelete = function (id) {
            Incidente.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        };
    }
})();
