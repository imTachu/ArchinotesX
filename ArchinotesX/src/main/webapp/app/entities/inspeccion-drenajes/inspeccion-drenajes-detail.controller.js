(function() {
    'use strict';

    angular
        .module('archinotesxApp')
        .controller('InspeccionDrenajesDetailController', InspeccionDrenajesDetailController);

    InspeccionDrenajesDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'entity', 'InspeccionDrenajes', 'Tramo'];

    function InspeccionDrenajesDetailController($scope, $rootScope, $stateParams, entity, InspeccionDrenajes, Tramo) {
        var vm = this;
        vm.inspeccionDrenajes = entity;
        
        var unsubscribe = $rootScope.$on('archinotesxApp:inspeccionDrenajesUpdate', function(event, result) {
            vm.inspeccionDrenajes = result;
        });
        $scope.$on('$destroy', unsubscribe);

    }
})();
