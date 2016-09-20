(function() {
    'use strict';

    angular
        .module('siccApp')
        .controller('MedidaEstadoSenalizacionHDetailController', MedidaEstadoSenalizacionHDetailController);

    MedidaEstadoSenalizacionHDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'entity', 'MedidaEstadoSenalizacionH', 'EstadoSenalizacionH'];

    function MedidaEstadoSenalizacionHDetailController($scope, $rootScope, $stateParams, entity, MedidaEstadoSenalizacionH, EstadoSenalizacionH) {
        var vm = this;
        vm.medidaEstadoSenalizacionH = entity;
        
        var unsubscribe = $rootScope.$on('siccApp:medidaEstadoSenalizacionHUpdate', function(event, result) {
            vm.medidaEstadoSenalizacionH = result;
        });
        $scope.$on('$destroy', unsubscribe);

    }
})();
