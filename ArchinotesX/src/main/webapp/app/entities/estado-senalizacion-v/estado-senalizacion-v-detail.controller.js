(function() {
    'use strict';

    angular
        .module('siccApp')
        .controller('EstadoSenalizacionVDetailController', EstadoSenalizacionVDetailController);

    EstadoSenalizacionVDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'entity', 'EstadoSenalizacionV', 'InspeccionSenalizacionV', 'TipoSenal'];

    function EstadoSenalizacionVDetailController($scope, $rootScope, $stateParams, entity, EstadoSenalizacionV, InspeccionSenalizacionV, TipoSenal) {
        var vm = this;
        vm.estadoSenalizacionV = entity;
        
        var unsubscribe = $rootScope.$on('siccApp:estadoSenalizacionVUpdate', function(event, result) {
            vm.estadoSenalizacionV = result;
        });
        $scope.$on('$destroy', unsubscribe);

    }
})();
