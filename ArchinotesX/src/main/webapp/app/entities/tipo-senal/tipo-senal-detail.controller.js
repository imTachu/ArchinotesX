(function() {
    'use strict';

    angular
        .module('archinotesxApp')
        .controller('TipoSenalDetailController', TipoSenalDetailController);

    TipoSenalDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'entity', 'TipoSenal', 'Tramo'];

    function TipoSenalDetailController($scope, $rootScope, $stateParams, entity, TipoSenal, Tramo) {
        var vm = this;
        vm.tipoSenal = entity;
        
        var unsubscribe = $rootScope.$on('archinotesxApp:tipoSenalUpdate', function(event, result) {
            vm.tipoSenal = result;
        });
        $scope.$on('$destroy', unsubscribe);

    }
})();
