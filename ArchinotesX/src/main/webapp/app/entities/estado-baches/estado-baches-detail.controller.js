(function() {
    'use strict';

    angular
        .module('archinotesxApp')
        .controller('EstadoBachesDetailController', EstadoBachesDetailController);

    EstadoBachesDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'entity', 'EstadoBaches', 'InspeccionBaches'];

    function EstadoBachesDetailController($scope, $rootScope, $stateParams, entity, EstadoBaches, InspeccionBaches) {
        var vm = this;
        vm.estadoBaches = entity;
        
        var unsubscribe = $rootScope.$on('archinotesxApp:estadoBachesUpdate', function(event, result) {
            vm.estadoBaches = result;
        });
        $scope.$on('$destroy', unsubscribe);

    }
})();
