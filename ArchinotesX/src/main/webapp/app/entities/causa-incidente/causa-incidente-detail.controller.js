(function() {
    'use strict';

    angular
        .module('siccApp')
        .controller('CausaIncidenteDetailController', CausaIncidenteDetailController);

    CausaIncidenteDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'entity', 'CausaIncidente'];

    function CausaIncidenteDetailController($scope, $rootScope, $stateParams, entity, CausaIncidente) {
        var vm = this;
        vm.causaIncidente = entity;
        
        var unsubscribe = $rootScope.$on('siccApp:causaIncidenteUpdate', function(event, result) {
            vm.causaIncidente = result;
        });
        $scope.$on('$destroy', unsubscribe);

    }
})();
