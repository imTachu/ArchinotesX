(function() {
    'use strict';

    angular
        .module('archinotesxApp')
        .controller('PersonaAfectadaEnAccidenteDetailController', PersonaAfectadaEnAccidenteDetailController);

    PersonaAfectadaEnAccidenteDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'entity', 'PersonaAfectadaEnAccidente', 'TipoAfectacionPersona', 'CentroMedico', 'Accidente'];

    function PersonaAfectadaEnAccidenteDetailController($scope, $rootScope, $stateParams, entity, PersonaAfectadaEnAccidente, TipoAfectacionPersona, CentroMedico, Accidente) {
        var vm = this;
        vm.personaAfectadaEnAccidente = entity;
        
        var unsubscribe = $rootScope.$on('archinotesxApp:personaAfectadaEnAccidenteUpdate', function(event, result) {
            vm.personaAfectadaEnAccidente = result;
        });
        $scope.$on('$destroy', unsubscribe);

    }
})();
