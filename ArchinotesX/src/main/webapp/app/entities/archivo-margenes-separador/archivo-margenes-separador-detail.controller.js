(function() {
    'use strict';

    angular
        .module('archinotesxApp')
        .controller('ArchivoMargenesSeparadorDetailController', ArchivoMargenesSeparadorDetailController);

    ArchivoMargenesSeparadorDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'entity', 'ArchivoMargenesSeparador', 'InspeccionMargenesSeparador'];

    function ArchivoMargenesSeparadorDetailController($scope, $rootScope, $stateParams, entity, ArchivoMargenesSeparador, InspeccionMargenesSeparador) {
        var vm = this;
        vm.archivoMargenesSeparador = entity;
        
        var unsubscribe = $rootScope.$on('archinotesxApp:archivoMargenesSeparadorUpdate', function(event, result) {
            vm.archivoMargenesSeparador = result;
        });
        $scope.$on('$destroy', unsubscribe);

    }
})();
