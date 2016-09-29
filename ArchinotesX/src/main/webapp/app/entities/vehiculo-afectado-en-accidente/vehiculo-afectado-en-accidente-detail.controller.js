(function() {
    'use strict';

    angular
        .module('archinotesxApp')
        .controller('VehiculoAfectadoEnAccidenteDetailController', VehiculoAfectadoEnAccidenteDetailController);

    VehiculoAfectadoEnAccidenteDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'entity', 'VehiculoAfectadoEnAccidente', 'TipoVehiculoAfectado', 'Accidente'];

    function VehiculoAfectadoEnAccidenteDetailController($scope, $rootScope, $stateParams, entity, VehiculoAfectadoEnAccidente, TipoVehiculoAfectado, Accidente) {
        var vm = this;
        vm.vehiculoAfectadoEnAccidente = entity;
        
        var unsubscribe = $rootScope.$on('archinotesxApp:vehiculoAfectadoEnAccidenteUpdate', function(event, result) {
            vm.vehiculoAfectadoEnAccidente = result;
        });
        $scope.$on('$destroy', unsubscribe);

    }
})();
