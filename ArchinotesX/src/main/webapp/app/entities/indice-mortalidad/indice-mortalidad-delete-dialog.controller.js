(function() {
    'use strict';

    angular
        .module('archinotesxApp')
        .controller('IndiceMortalidadDeleteController',IndiceMortalidadDeleteController);

    IndiceMortalidadDeleteController.$inject = ['$uibModalInstance', 'entity', 'IndiceMortalidad'];

    function IndiceMortalidadDeleteController($uibModalInstance, entity, IndiceMortalidad) {
        var vm = this;
        vm.indiceMortalidad = entity;
        vm.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };
        vm.confirmDelete = function (id) {
            IndiceMortalidad.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        };
    }
})();
