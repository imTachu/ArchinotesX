(function() {
    'use strict';

    angular
        .module('archinotesxApp')
        .controller('InspeccionSenalizacionVDetailController', InspeccionSenalizacionVDetailController);

    InspeccionSenalizacionVDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'entity', 'InspeccionSenalizacionV', 'Tramo'];

    function InspeccionSenalizacionVDetailController($scope, $rootScope, $stateParams, entity, InspeccionSenalizacionV, Tramo) {
        var vm = this;
        vm.inspeccionSenalizacionV = entity;
        
        var unsubscribe = $rootScope.$on('archinotesxApp:inspeccionSenalizacionVUpdate', function(event, result) {
            vm.inspeccionSenalizacionV = result;
        });
        $scope.$on('$destroy', unsubscribe);

    }
})();
