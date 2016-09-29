(function() {
    'use strict';

    angular
        .module('archinotesxApp')
        .controller('ArchivoInspeccionDesportillamientoDialogController', ArchivoInspeccionDesportillamientoDialogController);

    ArchivoInspeccionDesportillamientoDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'ArchivoInspeccionDesportillamiento', 'EstadoDesportillamiento'];

    function ArchivoInspeccionDesportillamientoDialogController ($timeout, $scope, $stateParams, $uibModalInstance, entity, ArchivoInspeccionDesportillamiento, EstadoDesportillamiento) {
        var vm = this;
        vm.archivoInspeccionDesportillamiento = entity;
        vm.estadodesportillamientos = EstadoDesportillamiento.query();

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        var onSaveSuccess = function (result) {
            $scope.$emit('archinotesxApp:archivoInspeccionDesportillamientoUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        };

        var onSaveError = function () {
            vm.isSaving = false;
        };

        vm.save = function () {
            vm.isSaving = true;
            if (vm.archivoInspeccionDesportillamiento.id !== null) {
                ArchivoInspeccionDesportillamiento.update(vm.archivoInspeccionDesportillamiento, onSaveSuccess, onSaveError);
            } else {
                ArchivoInspeccionDesportillamiento.save(vm.archivoInspeccionDesportillamiento, onSaveSuccess, onSaveError);
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
