(function() {
    'use strict';

    angular
        .module('archinotesxApp')
        .controller('EstructuraContencionDetailController', EstructuraContencionDetailController);

    EstructuraContencionDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'entity', 'EstructuraContencion', 'Tramo'];

    function EstructuraContencionDetailController($scope, $rootScope, $stateParams, entity, EstructuraContencion, Tramo) {
        var vm = this;
        vm.estructuraContencion = entity;
        
        var unsubscribe = $rootScope.$on('archinotesxApp:estructuraContencionUpdate', function(event, result) {
            vm.estructuraContencion = result;
        });
        $scope.$on('$destroy', unsubscribe);

    }
})();
