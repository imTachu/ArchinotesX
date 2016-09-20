(function() {
    'use strict';

    angular
        .module('siccApp')
        .controller('EstadoDesportillamientoDeleteController',EstadoDesportillamientoDeleteController);

    EstadoDesportillamientoDeleteController.$inject = ['$uibModalInstance', 'entity', 'EstadoDesportillamiento'];

    function EstadoDesportillamientoDeleteController($uibModalInstance, entity, EstadoDesportillamiento) {
        var vm = this;
        vm.estadoDesportillamiento = entity;
        vm.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };
        vm.confirmDelete = function (id) {
            EstadoDesportillamiento.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        };
    }
})();
