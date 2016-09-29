(function() {
    'use strict';

    angular
        .module('archinotesxApp')
        .controller('TipoNovedadAccidenteDetailController', TipoNovedadAccidenteDetailController);

    TipoNovedadAccidenteDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'entity', 'TipoNovedadAccidente'];

    function TipoNovedadAccidenteDetailController($scope, $rootScope, $stateParams, entity, TipoNovedadAccidente) {
        var vm = this;
        vm.tipoNovedadAccidente = entity;
        
        var unsubscribe = $rootScope.$on('archinotesxApp:tipoNovedadAccidenteUpdate', function(event, result) {
            vm.tipoNovedadAccidente = result;
        });
        $scope.$on('$destroy', unsubscribe);

    }
})();
