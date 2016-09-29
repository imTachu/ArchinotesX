(function() {
    'use strict';

    angular
        .module('archinotesxApp')
        .controller('TipoVehiculoAfectadoDetailController', TipoVehiculoAfectadoDetailController);

    TipoVehiculoAfectadoDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'entity', 'TipoVehiculoAfectado'];

    function TipoVehiculoAfectadoDetailController($scope, $rootScope, $stateParams, entity, TipoVehiculoAfectado) {
        var vm = this;
        vm.tipoVehiculoAfectado = entity;
        
        var unsubscribe = $rootScope.$on('archinotesxApp:tipoVehiculoAfectadoUpdate', function(event, result) {
            vm.tipoVehiculoAfectado = result;
        });
        $scope.$on('$destroy', unsubscribe);

    }
})();
