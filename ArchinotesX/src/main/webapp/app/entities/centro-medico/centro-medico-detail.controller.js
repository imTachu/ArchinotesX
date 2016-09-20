(function() {
    'use strict';

    angular
        .module('siccApp')
        .controller('CentroMedicoDetailController', CentroMedicoDetailController);

    CentroMedicoDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'entity', 'CentroMedico'];

    function CentroMedicoDetailController($scope, $rootScope, $stateParams, entity, CentroMedico) {
        var vm = this;
        vm.centroMedico = entity;
        
        var unsubscribe = $rootScope.$on('siccApp:centroMedicoUpdate', function(event, result) {
            vm.centroMedico = result;
        });
        $scope.$on('$destroy', unsubscribe);

    }
})();
