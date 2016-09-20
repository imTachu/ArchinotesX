(function() {
    'use strict';

    angular
        .module('siccApp')
        .controller('ArchivoAccidenteDetailController', ArchivoAccidenteDetailController);

    ArchivoAccidenteDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'entity', 'ArchivoAccidente', 'Accidente'];

    function ArchivoAccidenteDetailController($scope, $rootScope, $stateParams, entity, ArchivoAccidente, Accidente) {
        var vm = this;
        vm.archivoAccidente = entity;
        
        var unsubscribe = $rootScope.$on('siccApp:archivoAccidenteUpdate', function(event, result) {
            vm.archivoAccidente = result;
        });
        $scope.$on('$destroy', unsubscribe);

    }
})();
