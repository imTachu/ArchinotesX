(function() {
    'use strict';

    angular
        .module('siccApp')
        .controller('ArchivoColaPeajeDetailController', ArchivoColaPeajeDetailController);

    ArchivoColaPeajeDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'entity', 'ArchivoColaPeaje', 'ColaPeaje'];

    function ArchivoColaPeajeDetailController($scope, $rootScope, $stateParams, entity, ArchivoColaPeaje, ColaPeaje) {
        var vm = this;
        vm.archivoColaPeaje = entity;
        
        var unsubscribe = $rootScope.$on('siccApp:archivoColaPeajeUpdate', function(event, result) {
            vm.archivoColaPeaje = result;
        });
        $scope.$on('$destroy', unsubscribe);

    }
})();
