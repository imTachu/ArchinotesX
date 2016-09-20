(function() {
    'use strict';

    angular
        .module('siccApp')
        .controller('InspeccionBachesDetailController', InspeccionBachesDetailController);

    InspeccionBachesDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'entity', 'InspeccionBaches', 'Tramo'];

    function InspeccionBachesDetailController($scope, $rootScope, $stateParams, entity, InspeccionBaches, Tramo) {
        var vm = this;
        vm.inspeccionBaches = entity;
        
        var unsubscribe = $rootScope.$on('siccApp:inspeccionBachesUpdate', function(event, result) {
            vm.inspeccionBaches = result;
        });
        $scope.$on('$destroy', unsubscribe);

    }
})();
