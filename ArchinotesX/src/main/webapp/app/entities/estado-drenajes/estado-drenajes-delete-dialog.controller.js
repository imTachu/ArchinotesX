(function() {
    'use strict';

    angular
        .module('archinotesxApp')
        .controller('EstadoDrenajesDeleteController',EstadoDrenajesDeleteController);

    EstadoDrenajesDeleteController.$inject = ['$uibModalInstance', 'entity', 'EstadoDrenajes'];

    function EstadoDrenajesDeleteController($uibModalInstance, entity, EstadoDrenajes) {
        var vm = this;
        vm.estadoDrenajes = entity;
        vm.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };
        vm.confirmDelete = function (id) {
            EstadoDrenajes.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        };
    }
})();
