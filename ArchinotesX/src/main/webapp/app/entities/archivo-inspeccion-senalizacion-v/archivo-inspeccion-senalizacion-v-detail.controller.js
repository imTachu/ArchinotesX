(function() {
    'use strict';

    angular
        .module('siccApp')
        .controller('ArchivoInspeccionSenalizacionVDetailController', ArchivoInspeccionSenalizacionVDetailController);

    ArchivoInspeccionSenalizacionVDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'entity', 'ArchivoInspeccionSenalizacionV', 'EstadoSenalizacionV'];

    function ArchivoInspeccionSenalizacionVDetailController($scope, $rootScope, $stateParams, entity, ArchivoInspeccionSenalizacionV, EstadoSenalizacionV) {
        var vm = this;
        vm.archivoInspeccionSenalizacionV = entity;
        
        var unsubscribe = $rootScope.$on('siccApp:archivoInspeccionSenalizacionVUpdate', function(event, result) {
            vm.archivoInspeccionSenalizacionV = result;
        });
        $scope.$on('$destroy', unsubscribe);

    }
})();
