
(function() {
    'use strict';

    angular
        .module('archinotesxApp')
        .controller('EntityModalController', EntityModalController);

    EntityModalController.$inject = ['$timeout', '$scope', '$rootScope', '$stateParams', '$state', '$uibModalInstance', 'modalControllerConfig'];

    function EntityModalController($timeout, $scope, $rootScope, $stateParams, $state, $uibModalInstance, modalControllerConfig) {
        var vm = this;

        var modalEntity = modalControllerConfig.getEntity();

        var onCloseModal = $rootScope.$on('finalizar_'+ modalEntity, function(event, resultado) {
            $uibModalInstance.close(resultado);
        });

        var onDismissModal = $rootScope.$on('cancelar_'+ modalEntity, function(event, resultado) {
            $uibModalInstance.dismiss('cancel');
        });

        vm.clear = function() {
            $scope.$emit('cancelar_'+ modalEntity);
        };

        $scope.$on("$destroy", function() {
            onCloseModal();
            onDismissModal();
        });
    }
})();
