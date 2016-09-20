(function() {
    'use strict';

    angular
        .module('siccApp')
        .controller('TipoVehiculoApoyoDetailController', TipoVehiculoApoyoDetailController);

    TipoVehiculoApoyoDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'entity', 'TipoVehiculoApoyo'];

    function TipoVehiculoApoyoDetailController($scope, $rootScope, $stateParams, entity, TipoVehiculoApoyo) {
        var vm = this;
        vm.tipoVehiculoApoyo = entity;
        
        var unsubscribe = $rootScope.$on('siccApp:tipoVehiculoApoyoUpdate', function(event, result) {
            vm.tipoVehiculoApoyo = result;
        });
        $scope.$on('$destroy', unsubscribe);

    }
})();
