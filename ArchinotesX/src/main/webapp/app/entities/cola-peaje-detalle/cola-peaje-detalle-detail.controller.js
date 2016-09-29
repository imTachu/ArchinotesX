(function() {
    'use strict';

    angular
        .module('archinotesxApp')
        .controller('ColaPeajeDetalleDetailController', ColaPeajeDetalleDetailController);

    ColaPeajeDetalleDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'entity', 'ColaPeajeDetalle', 'ColaPeaje'];

    function ColaPeajeDetalleDetailController($scope, $rootScope, $stateParams, entity, ColaPeajeDetalle, ColaPeaje) {
        var vm = this;
        vm.colaPeajeDetalle = entity;
        
        var unsubscribe = $rootScope.$on('archinotesxApp:colaPeajeDetalleUpdate', function(event, result) {
            vm.colaPeajeDetalle = result;
        });
        $scope.$on('$destroy', unsubscribe);

    }
})();
