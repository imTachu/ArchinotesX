(function() {
    'use strict';

    angular
        .module('siccApp')
        .controller('EstadoSenalizacionHDetailController', EstadoSenalizacionHDetailController);

    EstadoSenalizacionHDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'entity', 'EstadoSenalizacionH', 'InspeccionSenalizacionH'];

    function EstadoSenalizacionHDetailController($scope, $rootScope, $stateParams, entity, EstadoSenalizacionH, InspeccionSenalizacionH) {
        var vm = this;
        vm.estadoSenalizacionH = entity;
        
        var unsubscribe = $rootScope.$on('siccApp:estadoSenalizacionHUpdate', function(event, result) {
            vm.estadoSenalizacionH = result;
        });
        $scope.$on('$destroy', unsubscribe);

    }
})();
