(function() {
    'use strict';

    angular
        .module('siccApp')
        .controller('ColaPeajeDeleteController',ColaPeajeDeleteController);

    ColaPeajeDeleteController.$inject = ['$uibModalInstance', 'entity', 'ColaPeaje'];

    function ColaPeajeDeleteController($uibModalInstance, entity, ColaPeaje) {
        var vm = this;
        vm.colaPeaje = entity;
        vm.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };
        vm.confirmDelete = function (id) {
            ColaPeaje.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        };
    }
})();
