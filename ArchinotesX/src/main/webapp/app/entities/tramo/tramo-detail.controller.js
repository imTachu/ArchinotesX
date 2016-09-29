(function() {
    'use strict';

    angular
        .module('archinotesxApp')
        .controller('TramoDetailController', TramoDetailController);

    TramoDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'entity', 'Tramo'];

    function TramoDetailController($scope, $rootScope, $stateParams, entity, Tramo) {
        var vm = this;
        vm.tramo = entity;
        
        var unsubscribe = $rootScope.$on('archinotesxApp:tramoUpdate', function(event, result) {
            vm.tramo = result;
        });
        $scope.$on('$destroy', unsubscribe);

    }
})();
