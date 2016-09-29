(function() {
    'use strict';

    angular
        .module('archinotesxApp')
        .controller('ArchivoIndiceMortalidadDetailController', ArchivoIndiceMortalidadDetailController);

    ArchivoIndiceMortalidadDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'entity', 'ArchivoIndiceMortalidad', 'IndiceMortalidad'];

    function ArchivoIndiceMortalidadDetailController($scope, $rootScope, $stateParams, entity, ArchivoIndiceMortalidad, IndiceMortalidad) {
        var vm = this;
        vm.archivoIndiceMortalidad = entity;
        
        var unsubscribe = $rootScope.$on('archinotesxApp:archivoIndiceMortalidadUpdate', function(event, result) {
            vm.archivoIndiceMortalidad = result;
        });
        $scope.$on('$destroy', unsubscribe);

    }
})();
