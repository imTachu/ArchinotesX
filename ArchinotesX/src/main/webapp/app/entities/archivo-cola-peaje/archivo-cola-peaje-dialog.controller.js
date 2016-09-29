(function() {
    'use strict';

    angular
        .module('archinotesxApp')
        .controller('ArchivoColaPeajeDialogController', ArchivoColaPeajeDialogController);

    ArchivoColaPeajeDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'ArchivoColaPeaje', 'ColaPeaje'];

    function ArchivoColaPeajeDialogController ($timeout, $scope, $stateParams, $uibModalInstance, entity, ArchivoColaPeaje, ColaPeaje) {
        var vm = this;
        vm.archivoColaPeaje = entity;
        vm.colapeajes = ColaPeaje.query();

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        var onSaveSuccess = function (result) {
            $scope.$emit('archinotesxApp:archivoColaPeajeUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        };

        var onSaveError = function () {
            vm.isSaving = false;
        };

        vm.save = function () {
            vm.isSaving = true;
            if (vm.archivoColaPeaje.id !== null) {
                ArchivoColaPeaje.update(vm.archivoColaPeaje, onSaveSuccess, onSaveError);
            } else {
                ArchivoColaPeaje.save(vm.archivoColaPeaje, onSaveSuccess, onSaveError);
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
