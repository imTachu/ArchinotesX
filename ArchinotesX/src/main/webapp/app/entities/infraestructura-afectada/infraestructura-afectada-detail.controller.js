(function() {
    'use strict';

    angular
        .module('siccApp')
        .controller('InfraestructuraAfectadaDetailController', InfraestructuraAfectadaDetailController);

    InfraestructuraAfectadaDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'entity', 'InfraestructuraAfectada'];

    function InfraestructuraAfectadaDetailController($scope, $rootScope, $stateParams, entity, InfraestructuraAfectada) {
        var vm = this;
        vm.infraestructuraAfectada = entity;
        
        var unsubscribe = $rootScope.$on('siccApp:infraestructuraAfectadaUpdate', function(event, result) {
            vm.infraestructuraAfectada = result;
        });
        $scope.$on('$destroy', unsubscribe);

    }
})();
