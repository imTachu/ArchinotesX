(function() {
    'use strict';

    angular
        .module('siccApp')
        .controller('InspeccionDesportillamientoDetailController', InspeccionDesportillamientoDetailController);

    InspeccionDesportillamientoDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'entity', 'InspeccionDesportillamiento', 'Tramo'];

    function InspeccionDesportillamientoDetailController($scope, $rootScope, $stateParams, entity, InspeccionDesportillamiento, Tramo) {
        var vm = this;
        vm.inspeccionDesportillamiento = entity;
        
        var unsubscribe = $rootScope.$on('siccApp:inspeccionDesportillamientoUpdate', function(event, result) {
            vm.inspeccionDesportillamiento = result;
        });
        $scope.$on('$destroy', unsubscribe);

    }
})();
