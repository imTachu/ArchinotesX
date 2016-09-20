(function() {
    'use strict';

    angular
        .module('siccApp')
        .controller('InspeccionMargenesSeparadorDetailController', InspeccionMargenesSeparadorDetailController);

    InspeccionMargenesSeparadorDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'entity', 'InspeccionMargenesSeparador', 'Tramo'];

    function InspeccionMargenesSeparadorDetailController($scope, $rootScope, $stateParams, entity, InspeccionMargenesSeparador, Tramo) {
        var vm = this;
        vm.inspeccionMargenesSeparador = entity;
        
        var unsubscribe = $rootScope.$on('siccApp:inspeccionMargenesSeparadorUpdate', function(event, result) {
            vm.inspeccionMargenesSeparador = result;
        });
        $scope.$on('$destroy', unsubscribe);

    }
})();
