(function() {
    'use strict';

    angular
        .module('siccApp')
        .controller('ArchivoInspeccionBarreraDialogController', ArchivoInspeccionBarreraDialogController);

    ArchivoInspeccionBarreraDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'ArchivoInspeccionBarrera', 'EstadoBarreraContencion'];

    function ArchivoInspeccionBarreraDialogController ($timeout, $scope, $stateParams, $uibModalInstance, entity, ArchivoInspeccionBarrera, EstadoBarreraContencion) {
        var vm = this;
        vm.archivoInspeccionBarrera = entity;
        vm.estadobarreracontencions = EstadoBarreraContencion.query();

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        var onSaveSuccess = function (result) {
            $scope.$emit('siccApp:archivoInspeccionBarreraUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        };

        var onSaveError = function () {
            vm.isSaving = false;
        };

        vm.save = function () {
            vm.isSaving = true;
            if (vm.archivoInspeccionBarrera.id !== null) {
                ArchivoInspeccionBarrera.update(vm.archivoInspeccionBarrera, onSaveSuccess, onSaveError);
            } else {
                ArchivoInspeccionBarrera.save(vm.archivoInspeccionBarrera, onSaveSuccess, onSaveError);
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
