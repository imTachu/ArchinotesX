(function() {
    'use strict';

    angular
        .module('siccApp')
        .controller('ArchivoInspeccionDrenajesDetailController', ArchivoInspeccionDrenajesDetailController);

    ArchivoInspeccionDrenajesDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'entity', 'ArchivoInspeccionDrenajes', 'EstadoDrenajes'];

    function ArchivoInspeccionDrenajesDetailController($scope, $rootScope, $stateParams, entity, ArchivoInspeccionDrenajes, EstadoDrenajes) {
        var vm = this;
        vm.archivoInspeccionDrenajes = entity;
        
        var unsubscribe = $rootScope.$on('siccApp:archivoInspeccionDrenajesUpdate', function(event, result) {
            vm.archivoInspeccionDrenajes = result;
        });
        $scope.$on('$destroy', unsubscribe);

    }
})();
