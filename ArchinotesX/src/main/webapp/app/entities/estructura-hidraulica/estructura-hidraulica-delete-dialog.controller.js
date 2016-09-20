(function() {
    'use strict';

    angular
        .module('siccApp')
        .controller('EstructuraHidraulicaDeleteController',EstructuraHidraulicaDeleteController);

    EstructuraHidraulicaDeleteController.$inject = ['$uibModalInstance', 'entity', 'EstructuraHidraulica'];

    function EstructuraHidraulicaDeleteController($uibModalInstance, entity, EstructuraHidraulica) {
        var vm = this;
        vm.estructuraHidraulica = entity;
        vm.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };
        vm.confirmDelete = function (id) {
            EstructuraHidraulica.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        };
    }
})();
