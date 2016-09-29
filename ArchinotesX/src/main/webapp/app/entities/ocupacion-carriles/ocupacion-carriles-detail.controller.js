(function() {
    'use strict';

    angular
        .module('archinotesxApp')
        .controller('OcupacionCarrilesDetailController', OcupacionCarrilesDetailController);

    OcupacionCarrilesDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'entity', 'OcupacionCarriles'];

    function OcupacionCarrilesDetailController($scope, $rootScope, $stateParams, entity, OcupacionCarriles) {
        var vm = this;
        vm.ocupacionCarriles = entity;
        
        var unsubscribe = $rootScope.$on('archinotesxApp:ocupacionCarrilesUpdate', function(event, result) {
            vm.ocupacionCarriles = result;
        });
        $scope.$on('$destroy', unsubscribe);

    }
})();
