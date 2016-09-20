(function() {
    'use strict';

    angular
        .module('siccApp')
        .controller('ArchivoInspeccionSenalizacionHDetailController', ArchivoInspeccionSenalizacionHDetailController);

    ArchivoInspeccionSenalizacionHDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'entity', 'ArchivoInspeccionSenalizacionH', 'EstadoSenalizacionH'];

    function ArchivoInspeccionSenalizacionHDetailController($scope, $rootScope, $stateParams, entity, ArchivoInspeccionSenalizacionH, EstadoSenalizacionH) {
        var vm = this;
        vm.archivoInspeccionSenalizacionH = entity;
        
        var unsubscribe = $rootScope.$on('siccApp:archivoInspeccionSenalizacionHUpdate', function(event, result) {
            vm.archivoInspeccionSenalizacionH = result;
        });
        $scope.$on('$destroy', unsubscribe);

    }
})();
