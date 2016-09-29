(function() {
    'use strict';

    angular
        .module('archinotesxApp')
        .controller('CausaAccidenteDetailController', CausaAccidenteDetailController);

    CausaAccidenteDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'entity', 'CausaAccidente'];

    function CausaAccidenteDetailController($scope, $rootScope, $stateParams, entity, CausaAccidente) {
        var vm = this;
        vm.causaAccidente = entity;
        
        var unsubscribe = $rootScope.$on('archinotesxApp:causaAccidenteUpdate', function(event, result) {
            vm.causaAccidente = result;
        });
        $scope.$on('$destroy', unsubscribe);

    }
})();
