(function() {
    'use strict';

    angular
        .module('siccApp')
        .controller('CentroMedicoDialogController', CentroMedicoDialogController);

    CentroMedicoDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'CentroMedico'];

    function CentroMedicoDialogController ($timeout, $scope, $stateParams, $uibModalInstance, entity, CentroMedico) {
        var vm = this;
        vm.centroMedico = entity;

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        var onSaveSuccess = function (result) {
            $scope.$emit('siccApp:centroMedicoUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        };

        var onSaveError = function () {
            vm.isSaving = false;
        };

        vm.save = function () {
            vm.isSaving = true;
            if (vm.centroMedico.id !== null) {
                CentroMedico.update(vm.centroMedico, onSaveSuccess, onSaveError);
            } else {
                CentroMedico.save(vm.centroMedico, onSaveSuccess, onSaveError);
            }
        };

        vm.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };
    }
})();
