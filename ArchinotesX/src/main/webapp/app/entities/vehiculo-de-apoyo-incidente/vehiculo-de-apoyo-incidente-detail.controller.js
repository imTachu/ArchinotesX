(function() {
    'use strict';

    angular
        .module('siccApp')
        .controller('VehiculoDeApoyoIncidenteDetailController', VehiculoDeApoyoIncidenteDetailController);

    VehiculoDeApoyoIncidenteDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'entity', 'VehiculoDeApoyoIncidente', 'TipoVehiculoApoyo', 'Incidente'];

    function VehiculoDeApoyoIncidenteDetailController($scope, $rootScope, $stateParams, entity, VehiculoDeApoyoIncidente, TipoVehiculoApoyo, Incidente) {
        var vm = this;
        vm.vehiculoDeApoyoIncidente = entity;
        
        var unsubscribe = $rootScope.$on('siccApp:vehiculoDeApoyoIncidenteUpdate', function(event, result) {
            vm.vehiculoDeApoyoIncidente = result;
        });
        $scope.$on('$destroy', unsubscribe);

    }
})();
