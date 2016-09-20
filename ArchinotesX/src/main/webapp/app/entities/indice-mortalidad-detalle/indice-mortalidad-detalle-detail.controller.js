(function() {
    'use strict';

    angular
        .module('siccApp')
        .controller('IndiceMortalidadDetalleDetailController', IndiceMortalidadDetalleDetailController);

    IndiceMortalidadDetalleDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'entity', 'IndiceMortalidadDetalle', 'IndiceMortalidad'];

    function IndiceMortalidadDetalleDetailController($scope, $rootScope, $stateParams, entity, IndiceMortalidadDetalle, IndiceMortalidad) {
        var vm = this;
        vm.indiceMortalidadDetalle = entity;
        
        var unsubscribe = $rootScope.$on('siccApp:indiceMortalidadDetalleUpdate', function(event, result) {
            vm.indiceMortalidadDetalle = result;
        });
        $scope.$on('$destroy', unsubscribe);

    }
})();
