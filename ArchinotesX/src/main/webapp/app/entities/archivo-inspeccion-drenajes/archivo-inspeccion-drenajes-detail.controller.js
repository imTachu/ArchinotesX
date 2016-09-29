(function() {
    'use strict';

    angular
        .module('archinotesxApp')
        .controller('ArchivoInspeccionDrenajesDetailController', ArchivoInspeccionDrenajesDetailController);

    ArchivoInspeccionDrenajesDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'entity', 'ArchivoInspeccionDrenajes', 'EstadoDrenajes'];

    function ArchivoInspeccionDrenajesDetailController($scope, $rootScope, $stateParams, entity, ArchivoInspeccionDrenajes, EstadoDrenajes) {
        var vm = this;
        vm.archivoInspeccionDrenajes = entity;
        
        var unsubscribe = $rootScope.$on('archinotesxApp:archivoInspeccionDrenajesUpdate', function(event, result) {
            vm.archivoInspeccionDrenajes = result;
        });
        $scope.$on('$destroy', unsubscribe);

    }
})();
