(function() {
    'use strict';

    angular
        .module('archinotesxApp')
        .controller('InspeccionSenalizacionHDetailController', InspeccionSenalizacionHDetailController);

    InspeccionSenalizacionHDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'entity', 'InspeccionSenalizacionH', 'Tramo'];

    function InspeccionSenalizacionHDetailController($scope, $rootScope, $stateParams, entity, InspeccionSenalizacionH, Tramo) {
        var vm = this;
        vm.inspeccionSenalizacionH = entity;
        
        var unsubscribe = $rootScope.$on('archinotesxApp:inspeccionSenalizacionHUpdate', function(event, result) {
            vm.inspeccionSenalizacionH = result;
        });
        $scope.$on('$destroy', unsubscribe);

    }
})();
