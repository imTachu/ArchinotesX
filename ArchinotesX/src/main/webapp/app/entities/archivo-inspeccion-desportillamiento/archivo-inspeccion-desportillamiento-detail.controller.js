(function() {
    'use strict';

    angular
        .module('archinotesxApp')
        .controller('ArchivoInspeccionDesportillamientoDetailController', ArchivoInspeccionDesportillamientoDetailController);

    ArchivoInspeccionDesportillamientoDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'entity', 'ArchivoInspeccionDesportillamiento', 'EstadoDesportillamiento'];

    function ArchivoInspeccionDesportillamientoDetailController($scope, $rootScope, $stateParams, entity, ArchivoInspeccionDesportillamiento, EstadoDesportillamiento) {
        var vm = this;
        vm.archivoInspeccionDesportillamiento = entity;
        
        var unsubscribe = $rootScope.$on('archinotesxApp:archivoInspeccionDesportillamientoUpdate', function(event, result) {
            vm.archivoInspeccionDesportillamiento = result;
        });
        $scope.$on('$destroy', unsubscribe);

    }
})();
