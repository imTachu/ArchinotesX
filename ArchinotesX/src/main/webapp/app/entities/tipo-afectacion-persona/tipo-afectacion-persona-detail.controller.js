(function() {
    'use strict';

    angular
        .module('siccApp')
        .controller('TipoAfectacionPersonaDetailController', TipoAfectacionPersonaDetailController);

    TipoAfectacionPersonaDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'entity', 'TipoAfectacionPersona'];

    function TipoAfectacionPersonaDetailController($scope, $rootScope, $stateParams, entity, TipoAfectacionPersona) {
        var vm = this;
        vm.tipoAfectacionPersona = entity;
        
        var unsubscribe = $rootScope.$on('siccApp:tipoAfectacionPersonaUpdate', function(event, result) {
            vm.tipoAfectacionPersona = result;
        });
        $scope.$on('$destroy', unsubscribe);

    }
})();
