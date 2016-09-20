(function() {
    'use strict';

    angular
        .module('siccApp')
        .controller('ArchivoOcupacionCarrilesDetailController', ArchivoOcupacionCarrilesDetailController);

    ArchivoOcupacionCarrilesDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'entity', 'ArchivoOcupacionCarriles', 'OcupacionCarriles'];

    function ArchivoOcupacionCarrilesDetailController($scope, $rootScope, $stateParams, entity, ArchivoOcupacionCarriles, OcupacionCarriles) {
        var vm = this;
        vm.archivoOcupacionCarriles = entity;
        
        var unsubscribe = $rootScope.$on('siccApp:archivoOcupacionCarrilesUpdate', function(event, result) {
            vm.archivoOcupacionCarriles = result;
        });
        $scope.$on('$destroy', unsubscribe);

    }
})();
