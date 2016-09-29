(function() {
    'use strict';

    angular
        .module('archinotesxApp')
        .controller('OcupacionCarrilesDetalleDetailController', OcupacionCarrilesDetalleDetailController);

    OcupacionCarrilesDetalleDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'entity', 'OcupacionCarrilesDetalle', 'OcupacionCarriles'];

    function OcupacionCarrilesDetalleDetailController($scope, $rootScope, $stateParams, entity, OcupacionCarrilesDetalle, OcupacionCarriles) {
        var vm = this;
        vm.ocupacionCarrilesDetalle = entity;
        
        var unsubscribe = $rootScope.$on('archinotesxApp:ocupacionCarrilesDetalleUpdate', function(event, result) {
            vm.ocupacionCarrilesDetalle = result;
        });
        $scope.$on('$destroy', unsubscribe);

    }
})();
