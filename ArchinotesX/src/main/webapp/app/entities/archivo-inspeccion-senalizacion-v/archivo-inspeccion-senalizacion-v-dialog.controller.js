(function() {
    'use strict';

    angular
        .module('siccApp')
        .controller('ArchivoInspeccionSenalizacionVDialogController', ArchivoInspeccionSenalizacionVDialogController);

    ArchivoInspeccionSenalizacionVDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'ArchivoInspeccionSenalizacionV', 'EstadoSenalizacionV'];

    function ArchivoInspeccionSenalizacionVDialogController ($timeout, $scope, $stateParams, $uibModalInstance, entity, ArchivoInspeccionSenalizacionV, EstadoSenalizacionV) {
        var vm = this;
        vm.archivoInspeccionSenalizacionV = entity;
        vm.estadosenalizacionvs = EstadoSenalizacionV.query();

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        var onSaveSuccess = function (result) {
            $scope.$emit('siccApp:archivoInspeccionSenalizacionVUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        };

        var onSaveError = function () {
            vm.isSaving = false;
        };

        vm.save = function () {
            vm.isSaving = true;
            if (vm.archivoInspeccionSenalizacionV.id !== null) {
                ArchivoInspeccionSenalizacionV.update(vm.archivoInspeccionSenalizacionV, onSaveSuccess, onSaveError);
            } else {
                ArchivoInspeccionSenalizacionV.save(vm.archivoInspeccionSenalizacionV, onSaveSuccess, onSaveError);
            }
        };

        vm.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };

        vm.datePickerOpenStatus = {};
        vm.datePickerOpenStatus.fechaDeRegistro = false;

        vm.openCalendar = function(date) {
            vm.datePickerOpenStatus[date] = true;
        };
    }
})();
