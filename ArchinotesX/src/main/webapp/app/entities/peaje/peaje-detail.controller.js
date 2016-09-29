(function() {
    'use strict';

    angular
        .module('archinotesxApp')
        .controller('PeajeDetailController', PeajeDetailController);

    PeajeDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'entity', 'Peaje', 'Tramo'];

    function PeajeDetailController($scope, $rootScope, $stateParams, entity, Peaje, Tramo) {
        var vm = this;
        vm.peaje = entity;
        
        var unsubscribe = $rootScope.$on('archinotesxApp:peajeUpdate', function(event, result) {
            vm.peaje = result;
        });
        $scope.$on('$destroy', unsubscribe);

    }
})();
