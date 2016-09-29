(function() {
    'use strict';

    angular
        .module('archinotesxApp')
        .controller('InfraestructuraAfectadaDialogController', InfraestructuraAfectadaDialogController);

    InfraestructuraAfectadaDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'InfraestructuraAfectada'];

    function InfraestructuraAfectadaDialogController ($timeout, $scope, $stateParams, $uibModalInstance, entity, InfraestructuraAfectada) {
        var vm = this;
        vm.infraestructuraAfectada = entity;

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        var onSaveSuccess = function (result) {
            $scope.$emit('archinotesxApp:infraestructuraAfectadaUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        };

        var onSaveError = function () {
            vm.isSaving = false;
        };

        vm.save = function () {
            vm.isSaving = true;
            if (vm.infraestructuraAfectada.id !== null) {
                InfraestructuraAfectada.update(vm.infraestructuraAfectada, onSaveSuccess, onSaveError);
            } else {
                InfraestructuraAfectada.save(vm.infraestructuraAfectada, onSaveSuccess, onSaveError);
            }
        };

        vm.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };
    }
})();
