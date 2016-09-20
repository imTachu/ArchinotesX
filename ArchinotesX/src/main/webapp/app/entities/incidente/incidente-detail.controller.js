(function() {
    'use strict';

    angular
        .module('siccApp')
        .controller('IncidenteDetailController', IncidenteDetailController);

    IncidenteDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'entity', 'Incidente', 'InfraestructuraAfectada', 'CausaIncidente', 'TipoIncidente', 'FactorClimatologico', 'Tramo'];

    function IncidenteDetailController($scope, $rootScope, $stateParams, entity, Incidente, InfraestructuraAfectada, CausaIncidente, TipoIncidente, FactorClimatologico, Tramo) {
        var vm = this;
        vm.incidente = entity;
        
        var unsubscribe = $rootScope.$on('siccApp:incidenteUpdate', function(event, result) {
            vm.incidente = result;
        });
        $scope.$on('$destroy', unsubscribe);

    }
})();
