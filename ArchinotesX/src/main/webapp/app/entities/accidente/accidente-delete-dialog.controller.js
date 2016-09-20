(function() {
    'use strict';

    angular
        .module('siccApp')
        .controller('AccidenteDeleteController',AccidenteDeleteController);

    AccidenteDeleteController.$inject = ['$uibModalInstance', 'entity', 'Accidente'];

    function AccidenteDeleteController($uibModalInstance, entity, Accidente) {
        var vm = this;
        vm.accidente = entity;
        vm.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };
        vm.confirmDelete = function (id) {
            Accidente.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        };
    }
})();
