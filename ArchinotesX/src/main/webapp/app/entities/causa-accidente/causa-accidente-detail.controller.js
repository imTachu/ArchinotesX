(function() {
    'use strict';

    angular
        .module('siccApp')
        .controller('CausaAccidenteDetailController', CausaAccidenteDetailController);

    CausaAccidenteDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'entity', 'CausaAccidente'];

    function CausaAccidenteDetailController($scope, $rootScope, $stateParams, entity, CausaAccidente) {
        var vm = this;
        vm.causaAccidente = entity;
        
        var unsubscribe = $rootScope.$on('siccApp:causaAccidenteUpdate', function(event, result) {
            vm.causaAccidente = result;
        });
        $scope.$on('$destroy', unsubscribe);

    }
})();
