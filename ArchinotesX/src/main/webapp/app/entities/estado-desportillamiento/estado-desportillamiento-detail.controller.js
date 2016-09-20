(function() {
    'use strict';

    angular
        .module('siccApp')
        .controller('EstadoDesportillamientoDetailController', EstadoDesportillamientoDetailController);

    EstadoDesportillamientoDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'entity', 'EstadoDesportillamiento', 'InspeccionDesportillamiento'];

    function EstadoDesportillamientoDetailController($scope, $rootScope, $stateParams, entity, EstadoDesportillamiento, InspeccionDesportillamiento) {
        var vm = this;
        vm.estadoDesportillamiento = entity;
        
        var unsubscribe = $rootScope.$on('siccApp:estadoDesportillamientoUpdate', function(event, result) {
            vm.estadoDesportillamiento = result;
        });
        $scope.$on('$destroy', unsubscribe);

    }
})();
