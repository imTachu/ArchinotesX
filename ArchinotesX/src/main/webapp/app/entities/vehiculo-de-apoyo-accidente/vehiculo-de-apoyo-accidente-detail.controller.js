(function() {
    'use strict';

    angular
        .module('siccApp')
        .controller('VehiculoDeApoyoAccidenteDetailController', VehiculoDeApoyoAccidenteDetailController);

    VehiculoDeApoyoAccidenteDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'entity', 'VehiculoDeApoyoAccidente', 'TipoVehiculoApoyo', 'Accidente'];

    function VehiculoDeApoyoAccidenteDetailController($scope, $rootScope, $stateParams, entity, VehiculoDeApoyoAccidente, TipoVehiculoApoyo, Accidente) {
        var vm = this;
        vm.vehiculoDeApoyoAccidente = entity;
        
        var unsubscribe = $rootScope.$on('siccApp:vehiculoDeApoyoAccidenteUpdate', function(event, result) {
            vm.vehiculoDeApoyoAccidente = result;
        });
        $scope.$on('$destroy', unsubscribe);

    }
})();
