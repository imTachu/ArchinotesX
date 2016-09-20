(function() {
    'use strict';

    angular
        .module('siccApp')
        .controller('FactorClimatologicoDeleteController',FactorClimatologicoDeleteController);

    FactorClimatologicoDeleteController.$inject = ['$uibModalInstance', 'entity', 'FactorClimatologico'];

    function FactorClimatologicoDeleteController($uibModalInstance, entity, FactorClimatologico) {
        var vm = this;
        vm.factorClimatologico = entity;
        vm.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };
        vm.confirmDelete = function (id) {
            FactorClimatologico.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        };
    }
})();
