(function() {
    'use strict';

    angular
        .module('siccApp')
        .controller('EstructuraHidraulicaDetailController', EstructuraHidraulicaDetailController);

    EstructuraHidraulicaDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'entity', 'EstructuraHidraulica', 'Tramo'];

    function EstructuraHidraulicaDetailController($scope, $rootScope, $stateParams, entity, EstructuraHidraulica, Tramo) {
        var vm = this;
        vm.estructuraHidraulica = entity;
        
        var unsubscribe = $rootScope.$on('siccApp:estructuraHidraulicaUpdate', function(event, result) {
            vm.estructuraHidraulica = result;
        });
        $scope.$on('$destroy', unsubscribe);

    }
})();
