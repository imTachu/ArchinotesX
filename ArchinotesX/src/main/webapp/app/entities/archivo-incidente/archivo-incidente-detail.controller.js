(function() {
    'use strict';

    angular
        .module('siccApp')
        .controller('ArchivoIncidenteDetailController', ArchivoIncidenteDetailController);

    ArchivoIncidenteDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'entity', 'ArchivoIncidente', 'Incidente'];

    function ArchivoIncidenteDetailController($scope, $rootScope, $stateParams, entity, ArchivoIncidente, Incidente) {
        var vm = this;
        vm.archivoIncidente = entity;
        
        var unsubscribe = $rootScope.$on('siccApp:archivoIncidenteUpdate', function(event, result) {
            vm.archivoIncidente = result;
        });
        $scope.$on('$destroy', unsubscribe);

    }
})();
