(function() {
    'use strict';

    angular
        .module('archinotesxApp')
        .controller('EstadoDesportillamientoDetailController', EstadoDesportillamientoDetailController);

    EstadoDesportillamientoDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'entity', 'EstadoDesportillamiento', 'InspeccionDesportillamiento'];

    function EstadoDesportillamientoDetailController($scope, $rootScope, $stateParams, entity, EstadoDesportillamiento, InspeccionDesportillamiento) {
        var vm = this;
        vm.estadoDesportillamiento = entity;
        
        var unsubscribe = $rootScope.$on('archinotesxApp:estadoDesportillamientoUpdate', function(event, result) {
            vm.estadoDesportillamiento = result;
        });
        $scope.$on('$destroy', unsubscribe);

    }
})();
