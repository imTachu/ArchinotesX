(function() {
    'use strict';

    angular
        .module('archinotesxApp')
        .controller('TipoIncidenteDetailController', TipoIncidenteDetailController);

    TipoIncidenteDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'entity', 'TipoIncidente'];

    function TipoIncidenteDetailController($scope, $rootScope, $stateParams, entity, TipoIncidente) {
        var vm = this;
        vm.tipoIncidente = entity;
        
        var unsubscribe = $rootScope.$on('archinotesxApp:tipoIncidenteUpdate', function(event, result) {
            vm.tipoIncidente = result;
        });
        $scope.$on('$destroy', unsubscribe);

    }
})();
