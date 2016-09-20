(function() {
    'use strict';

    angular
        .module('siccApp')
        .controller('CausaAccidenteDeleteController',CausaAccidenteDeleteController);

    CausaAccidenteDeleteController.$inject = ['$uibModalInstance', 'entity', 'CausaAccidente'];

    function CausaAccidenteDeleteController($uibModalInstance, entity, CausaAccidente) {
        var vm = this;
        vm.causaAccidente = entity;
        vm.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };
        vm.confirmDelete = function (id) {
            CausaAccidente.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        };
    }
})();
