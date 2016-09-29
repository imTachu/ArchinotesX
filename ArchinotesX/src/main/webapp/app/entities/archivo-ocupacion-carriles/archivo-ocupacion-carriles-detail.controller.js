(function() {
    'use strict';

    angular
        .module('archinotesxApp')
        .controller('ArchivoOcupacionCarrilesDetailController', ArchivoOcupacionCarrilesDetailController);

    ArchivoOcupacionCarrilesDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'entity', 'ArchivoOcupacionCarriles', 'OcupacionCarriles'];

    function ArchivoOcupacionCarrilesDetailController($scope, $rootScope, $stateParams, entity, ArchivoOcupacionCarriles, OcupacionCarriles) {
        var vm = this;
        vm.archivoOcupacionCarriles = entity;
        
        var unsubscribe = $rootScope.$on('archinotesxApp:archivoOcupacionCarrilesUpdate', function(event, result) {
            vm.archivoOcupacionCarriles = result;
        });
        $scope.$on('$destroy', unsubscribe);

    }
})();
