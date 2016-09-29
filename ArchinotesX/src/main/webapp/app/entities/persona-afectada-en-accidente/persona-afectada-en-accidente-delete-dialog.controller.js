(function() {
    'use strict';

    angular
        .module('archinotesxApp')
        .controller('PersonaAfectadaEnAccidenteDeleteController',PersonaAfectadaEnAccidenteDeleteController);

    PersonaAfectadaEnAccidenteDeleteController.$inject = ['$uibModalInstance', 'entity', 'PersonaAfectadaEnAccidente'];

    function PersonaAfectadaEnAccidenteDeleteController($uibModalInstance, entity, PersonaAfectadaEnAccidente) {
        var vm = this;
        vm.personaAfectadaEnAccidente = entity;
        vm.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };
        vm.confirmDelete = function (id) {
            PersonaAfectadaEnAccidente.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        };
    }
})();
