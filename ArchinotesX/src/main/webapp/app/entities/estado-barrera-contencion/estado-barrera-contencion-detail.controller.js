(function() {
    'use strict';

    angular
        .module('archinotesxApp')
        .controller('EstadoBarreraContencionDetailController', EstadoBarreraContencionDetailController);

    EstadoBarreraContencionDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'entity', 'EstadoBarreraContencion', 'InspeccionBarreraContencion', 'EstructuraContencion'];

    function EstadoBarreraContencionDetailController($scope, $rootScope, $stateParams, entity, EstadoBarreraContencion, InspeccionBarreraContencion, EstructuraContencion) {
        var vm = this;
        vm.estadoBarreraContencion = entity;
        
        var unsubscribe = $rootScope.$on('archinotesxApp:estadoBarreraContencionUpdate', function(event, result) {
            vm.estadoBarreraContencion = result;
        });
        $scope.$on('$destroy', unsubscribe);

    }
})();
