(function() {
    'use strict';

    angular
        .module('siccApp')
        .controller('CausaIncidenteDeleteController',CausaIncidenteDeleteController);

    CausaIncidenteDeleteController.$inject = ['$uibModalInstance', 'entity', 'CausaIncidente'];

    function CausaIncidenteDeleteController($uibModalInstance, entity, CausaIncidente) {
        var vm = this;
        vm.causaIncidente = entity;
        vm.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };
        vm.confirmDelete = function (id) {
            CausaIncidente.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        };
    }
})();
