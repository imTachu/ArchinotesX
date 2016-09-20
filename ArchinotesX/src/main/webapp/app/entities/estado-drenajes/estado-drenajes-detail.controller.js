(function() {
    'use strict';

    angular
        .module('siccApp')
        .controller('EstadoDrenajesDetailController', EstadoDrenajesDetailController);

    EstadoDrenajesDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'entity', 'EstadoDrenajes', 'EstructuraHidraulica', 'InspeccionDrenajes'];

    function EstadoDrenajesDetailController($scope, $rootScope, $stateParams, entity, EstadoDrenajes, EstructuraHidraulica, InspeccionDrenajes) {
        var vm = this;
        vm.estadoDrenajes = entity;
        
        var unsubscribe = $rootScope.$on('siccApp:estadoDrenajesUpdate', function(event, result) {
            vm.estadoDrenajes = result;
        });
        $scope.$on('$destroy', unsubscribe);

    }
})();
