(function() {
    'use strict';

    angular
        .module('siccApp')
        .controller('TipoVehiculoAfectadoDetailController', TipoVehiculoAfectadoDetailController);

    TipoVehiculoAfectadoDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'entity', 'TipoVehiculoAfectado'];

    function TipoVehiculoAfectadoDetailController($scope, $rootScope, $stateParams, entity, TipoVehiculoAfectado) {
        var vm = this;
        vm.tipoVehiculoAfectado = entity;
        
        var unsubscribe = $rootScope.$on('siccApp:tipoVehiculoAfectadoUpdate', function(event, result) {
            vm.tipoVehiculoAfectado = result;
        });
        $scope.$on('$destroy', unsubscribe);

    }
})();
