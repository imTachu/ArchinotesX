(function() {
    'use strict';

    angular
        .module('archinotesxApp')
        .controller('ColaPeajeDetailController', ColaPeajeDetailController);

    ColaPeajeDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'entity', 'ColaPeaje', 'Peaje'];

    function ColaPeajeDetailController($scope, $rootScope, $stateParams, entity, ColaPeaje, Peaje) {
        var vm = this;
        vm.colaPeaje = entity;
        
        var unsubscribe = $rootScope.$on('archinotesxApp:colaPeajeUpdate', function(event, result) {
            vm.colaPeaje = result;
        });
        $scope.$on('$destroy', unsubscribe);

    }
})();
