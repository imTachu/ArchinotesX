(function() {
    'use strict';

    angular
        .module('archinotesxApp')
        .controller('InspeccionDesportillamientoDetailController', InspeccionDesportillamientoDetailController);

    InspeccionDesportillamientoDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'entity', 'InspeccionDesportillamiento', 'Tramo'];

    function InspeccionDesportillamientoDetailController($scope, $rootScope, $stateParams, entity, InspeccionDesportillamiento, Tramo) {
        var vm = this;
        vm.inspeccionDesportillamiento = entity;
        
        var unsubscribe = $rootScope.$on('archinotesxApp:inspeccionDesportillamientoUpdate', function(event, result) {
            vm.inspeccionDesportillamiento = result;
        });
        $scope.$on('$destroy', unsubscribe);

    }
})();
