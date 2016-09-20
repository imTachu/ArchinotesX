(function() {
    'use strict';

    angular
        .module('siccApp')
        .controller('OcupacionCarrilesDetalleDetailController', OcupacionCarrilesDetalleDetailController);

    OcupacionCarrilesDetalleDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'entity', 'OcupacionCarrilesDetalle', 'OcupacionCarriles'];

    function OcupacionCarrilesDetalleDetailController($scope, $rootScope, $stateParams, entity, OcupacionCarrilesDetalle, OcupacionCarriles) {
        var vm = this;
        vm.ocupacionCarrilesDetalle = entity;
        
        var unsubscribe = $rootScope.$on('siccApp:ocupacionCarrilesDetalleUpdate', function(event, result) {
            vm.ocupacionCarrilesDetalle = result;
        });
        $scope.$on('$destroy', unsubscribe);

    }
})();
