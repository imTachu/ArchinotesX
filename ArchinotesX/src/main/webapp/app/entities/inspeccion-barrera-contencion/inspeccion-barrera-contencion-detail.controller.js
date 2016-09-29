(function() {
    'use strict';

    angular
        .module('archinotesxApp')
        .controller('InspeccionBarreraContencionDetailController', InspeccionBarreraContencionDetailController);

    InspeccionBarreraContencionDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'entity', 'InspeccionBarreraContencion', 'Tramo'];

    function InspeccionBarreraContencionDetailController($scope, $rootScope, $stateParams, entity, InspeccionBarreraContencion, Tramo) {
        var vm = this;
        vm.inspeccionBarreraContencion = entity;
        
        var unsubscribe = $rootScope.$on('archinotesxApp:inspeccionBarreraContencionUpdate', function(event, result) {
            vm.inspeccionBarreraContencion = result;
        });
        $scope.$on('$destroy', unsubscribe);

    }
})();
