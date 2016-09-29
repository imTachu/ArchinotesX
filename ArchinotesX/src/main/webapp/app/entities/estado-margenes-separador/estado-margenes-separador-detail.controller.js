(function() {
    'use strict';

    angular
        .module('archinotesxApp')
        .controller('EstadoMargenesSeparadorDetailController', EstadoMargenesSeparadorDetailController);

    EstadoMargenesSeparadorDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'entity', 'EstadoMargenesSeparador', 'InspeccionMargenesSeparador'];

    function EstadoMargenesSeparadorDetailController($scope, $rootScope, $stateParams, entity, EstadoMargenesSeparador, InspeccionMargenesSeparador) {
        var vm = this;
        vm.estadoMargenesSeparador = entity;
        
        var unsubscribe = $rootScope.$on('archinotesxApp:estadoMargenesSeparadorUpdate', function(event, result) {
            vm.estadoMargenesSeparador = result;
        });
        $scope.$on('$destroy', unsubscribe);

    }
})();
