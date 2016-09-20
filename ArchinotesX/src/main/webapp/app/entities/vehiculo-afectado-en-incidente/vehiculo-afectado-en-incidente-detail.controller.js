(function() {
    'use strict';

    angular
        .module('siccApp')
        .controller('VehiculoAfectadoEnIncidenteDetailController', VehiculoAfectadoEnIncidenteDetailController);

    VehiculoAfectadoEnIncidenteDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'entity', 'VehiculoAfectadoEnIncidente', 'TipoVehiculoAfectado', 'Incidente'];

    function VehiculoAfectadoEnIncidenteDetailController($scope, $rootScope, $stateParams, entity, VehiculoAfectadoEnIncidente, TipoVehiculoAfectado, Incidente) {
        var vm = this;
        vm.vehiculoAfectadoEnIncidente = entity;
        
        var unsubscribe = $rootScope.$on('siccApp:vehiculoAfectadoEnIncidenteUpdate', function(event, result) {
            vm.vehiculoAfectadoEnIncidente = result;
        });
        $scope.$on('$destroy', unsubscribe);

    }
})();
