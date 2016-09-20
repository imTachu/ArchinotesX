(function() {
    'use strict';

    angular
        .module('siccApp')
        .controller('AccidenteDetailController', AccidenteDetailController);

    AccidenteDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'entity', 'Accidente', 'InfraestructuraAfectada', 'CausaAccidente', 'TipoAccidente', 'FactorClimatologico', 'TipoNovedadAccidente', 'Tramo'];

    function AccidenteDetailController($scope, $rootScope, $stateParams, entity, Accidente, InfraestructuraAfectada, CausaAccidente, TipoAccidente, FactorClimatologico, TipoNovedadAccidente, Tramo) {
        var vm = this;
        vm.accidente = entity;
        
        var unsubscribe = $rootScope.$on('siccApp:accidenteUpdate', function(event, result) {
            vm.accidente = result;
        });
        $scope.$on('$destroy', unsubscribe);

    }
})();
