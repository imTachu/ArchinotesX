(function() {
    'use strict';

    angular
        .module('siccApp')
        .controller('VehiculoAfectadoEnAccidenteDetailController', VehiculoAfectadoEnAccidenteDetailController);

    VehiculoAfectadoEnAccidenteDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'entity', 'VehiculoAfectadoEnAccidente', 'TipoVehiculoAfectado', 'Accidente'];

    function VehiculoAfectadoEnAccidenteDetailController($scope, $rootScope, $stateParams, entity, VehiculoAfectadoEnAccidente, TipoVehiculoAfectado, Accidente) {
        var vm = this;
        vm.vehiculoAfectadoEnAccidente = entity;
        
        var unsubscribe = $rootScope.$on('siccApp:vehiculoAfectadoEnAccidenteUpdate', function(event, result) {
            vm.vehiculoAfectadoEnAccidente = result;
        });
        $scope.$on('$destroy', unsubscribe);

    }
})();
