(function() {
    'use strict';

    angular
        .module('siccApp')
        .controller('FactorClimatologicoDetailController', FactorClimatologicoDetailController);

    FactorClimatologicoDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'entity', 'FactorClimatologico'];

    function FactorClimatologicoDetailController($scope, $rootScope, $stateParams, entity, FactorClimatologico) {
        var vm = this;
        vm.factorClimatologico = entity;
        
        var unsubscribe = $rootScope.$on('siccApp:factorClimatologicoUpdate', function(event, result) {
            vm.factorClimatologico = result;
        });
        $scope.$on('$destroy', unsubscribe);

    }
})();
