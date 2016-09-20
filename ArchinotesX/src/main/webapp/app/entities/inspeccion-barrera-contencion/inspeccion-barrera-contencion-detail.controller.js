(function() {
    'use strict';

    angular
        .module('siccApp')
        .controller('InspeccionBarreraContencionDetailController', InspeccionBarreraContencionDetailController);

    InspeccionBarreraContencionDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'entity', 'InspeccionBarreraContencion', 'Tramo'];

    function InspeccionBarreraContencionDetailController($scope, $rootScope, $stateParams, entity, InspeccionBarreraContencion, Tramo) {
        var vm = this;
        vm.inspeccionBarreraContencion = entity;
        
        var unsubscribe = $rootScope.$on('siccApp:inspeccionBarreraContencionUpdate', function(event, result) {
            vm.inspeccionBarreraContencion = result;
        });
        $scope.$on('$destroy', unsubscribe);

    }
})();
