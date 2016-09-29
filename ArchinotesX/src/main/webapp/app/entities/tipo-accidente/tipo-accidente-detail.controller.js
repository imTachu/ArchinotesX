(function() {
    'use strict';

    angular
        .module('archinotesxApp')
        .controller('TipoAccidenteDetailController', TipoAccidenteDetailController);

    TipoAccidenteDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'entity', 'TipoAccidente'];

    function TipoAccidenteDetailController($scope, $rootScope, $stateParams, entity, TipoAccidente) {
        var vm = this;
        vm.tipoAccidente = entity;
        
        var unsubscribe = $rootScope.$on('archinotesxApp:tipoAccidenteUpdate', function(event, result) {
            vm.tipoAccidente = result;
        });
        $scope.$on('$destroy', unsubscribe);

    }
})();
