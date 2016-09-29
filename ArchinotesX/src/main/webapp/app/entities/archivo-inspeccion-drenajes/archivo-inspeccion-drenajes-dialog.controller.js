(function() {
    'use strict';

    angular
        .module('archinotesxApp')
        .controller('ArchivoInspeccionDrenajesDialogController', ArchivoInspeccionDrenajesDialogController);

    ArchivoInspeccionDrenajesDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'ArchivoInspeccionDrenajes', 'EstadoDrenajes'];

    function ArchivoInspeccionDrenajesDialogController ($timeout, $scope, $stateParams, $uibModalInstance, entity, ArchivoInspeccionDrenajes, EstadoDrenajes) {
        var vm = this;
        vm.archivoInspeccionDrenajes = entity;
        vm.estadodrenajes = EstadoDrenajes.query();

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        var onSaveSuccess = function (result) {
            $scope.$emit('archinotesxApp:archivoInspeccionDrenajesUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        };

        var onSaveError = function () {
            vm.isSaving = false;
        };

        vm.save = function () {
            vm.isSaving = true;
            if (vm.archivoInspeccionDrenajes.id !== null) {
                ArchivoInspeccionDrenajes.update(vm.archivoInspeccionDrenajes, onSaveSuccess, onSaveError);
            } else {
                ArchivoInspeccionDrenajes.save(vm.archivoInspeccionDrenajes, onSaveSuccess, onSaveError);
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
