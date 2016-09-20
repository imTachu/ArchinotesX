(function() {
    'use strict';

    angular
        .module('siccApp')
        .controller('TipoAccidenteDialogController', TipoAccidenteDialogController);

    TipoAccidenteDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'TipoAccidente'];

    function TipoAccidenteDialogController ($timeout, $scope, $stateParams, $uibModalInstance, entity, TipoAccidente) {
        var vm = this;
        vm.tipoAccidente = entity;

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        var onSaveSuccess = function (result) {
            $scope.$emit('siccApp:tipoAccidenteUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        };

        var onSaveError = function () {
            vm.isSaving = false;
        };

        vm.save = function () {
            vm.isSaving = true;
            if (vm.tipoAccidente.id !== null) {
                TipoAccidente.update(vm.tipoAccidente, onSaveSuccess, onSaveError);
            } else {
                TipoAccidente.save(vm.tipoAccidente, onSaveSuccess, onSaveError);
            }
        };

        vm.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };
    }
})();
