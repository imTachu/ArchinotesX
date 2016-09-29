(function() {
    'use strict';

    angular
        .module('archinotesxApp')
        .controller('IndiceMortalidadDetailController', IndiceMortalidadDetailController);

    IndiceMortalidadDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'entity', 'IndiceMortalidad', 'Tramo'];

    function IndiceMortalidadDetailController($scope, $rootScope, $stateParams, entity, IndiceMortalidad, Tramo) {
        var vm = this;
        vm.indiceMortalidad = entity;
        
        var unsubscribe = $rootScope.$on('archinotesxApp:indiceMortalidadUpdate', function(event, result) {
            vm.indiceMortalidad = result;
        });
        $scope.$on('$destroy', unsubscribe);

    }
})();
