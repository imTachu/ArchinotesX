(function() {
    'use strict';

    angular
        .module('archinotesxApp')
        .controller('EstructuraHidraulicaDetailController', EstructuraHidraulicaDetailController);

    EstructuraHidraulicaDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'entity', 'EstructuraHidraulica', 'Tramo'];

    function EstructuraHidraulicaDetailController($scope, $rootScope, $stateParams, entity, EstructuraHidraulica, Tramo) {
        var vm = this;
        vm.estructuraHidraulica = entity;
        
        var unsubscribe = $rootScope.$on('archinotesxApp:estructuraHidraulicaUpdate', function(event, result) {
            vm.estructuraHidraulica = result;
        });
        $scope.$on('$destroy', unsubscribe);

    }
})();
