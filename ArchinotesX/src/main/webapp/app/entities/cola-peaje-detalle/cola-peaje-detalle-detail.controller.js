(function() {
    'use strict';

    angular
        .module('siccApp')
        .controller('ColaPeajeDetalleDetailController', ColaPeajeDetalleDetailController);

    ColaPeajeDetalleDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'entity', 'ColaPeajeDetalle', 'ColaPeaje'];

    function ColaPeajeDetalleDetailController($scope, $rootScope, $stateParams, entity, ColaPeajeDetalle, ColaPeaje) {
        var vm = this;
        vm.colaPeajeDetalle = entity;
        
        var unsubscribe = $rootScope.$on('siccApp:colaPeajeDetalleUpdate', function(event, result) {
            vm.colaPeajeDetalle = result;
        });
        $scope.$on('$destroy', unsubscribe);

    }
})();
