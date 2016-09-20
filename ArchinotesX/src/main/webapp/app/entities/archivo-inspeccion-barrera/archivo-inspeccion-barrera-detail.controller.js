(function() {
    'use strict';

    angular
        .module('siccApp')
        .controller('ArchivoInspeccionBarreraDetailController', ArchivoInspeccionBarreraDetailController);

    ArchivoInspeccionBarreraDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'entity', 'ArchivoInspeccionBarrera', 'EstadoBarreraContencion'];

    function ArchivoInspeccionBarreraDetailController($scope, $rootScope, $stateParams, entity, ArchivoInspeccionBarrera, EstadoBarreraContencion) {
        var vm = this;
        vm.archivoInspeccionBarrera = entity;
        
        var unsubscribe = $rootScope.$on('siccApp:archivoInspeccionBarreraUpdate', function(event, result) {
            vm.archivoInspeccionBarrera = result;
        });
        $scope.$on('$destroy', unsubscribe);

    }
})();
