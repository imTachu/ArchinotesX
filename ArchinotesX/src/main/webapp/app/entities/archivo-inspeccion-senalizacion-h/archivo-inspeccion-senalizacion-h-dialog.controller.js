(function() {
    'use strict';

    angular
        .module('siccApp')
        .controller('ArchivoInspeccionSenalizacionHDialogController', ArchivoInspeccionSenalizacionHDialogController);

    ArchivoInspeccionSenalizacionHDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'ArchivoInspeccionSenalizacionH', 'EstadoSenalizacionH'];

    function ArchivoInspeccionSenalizacionHDialogController ($timeout, $scope, $stateParams, $uibModalInstance, entity, ArchivoInspeccionSenalizacionH, EstadoSenalizacionH) {
        var vm = this;
        vm.archivoInspeccionSenalizacionH = entity;
        vm.estadosenalizacionhs = EstadoSenalizacionH.query();

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        var onSaveSuccess = function (result) {
            $scope.$emit('siccApp:archivoInspeccionSenalizacionHUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        };

        var onSaveError = function () {
            vm.isSaving = false;
        };

        vm.save = function () {
            vm.isSaving = true;
            if (vm.archivoInspeccionSenalizacionH.id !== null) {
                ArchivoInspeccionSenalizacionH.update(vm.archivoInspeccionSenalizacionH, onSaveSuccess, onSaveError);
            } else {
                ArchivoInspeccionSenalizacionH.save(vm.archivoInspeccionSenalizacionH, onSaveSuccess, onSaveError);
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
