(function() {
    'use strict';

    angular
        .module('siccApp')
        .controller('ArchivoIndiceMortalidadDialogController', ArchivoIndiceMortalidadDialogController);

    ArchivoIndiceMortalidadDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'ArchivoIndiceMortalidad', 'IndiceMortalidad'];

    function ArchivoIndiceMortalidadDialogController ($timeout, $scope, $stateParams, $uibModalInstance, entity, ArchivoIndiceMortalidad, IndiceMortalidad) {
        var vm = this;
        vm.archivoIndiceMortalidad = entity;
        vm.indicemortalidads = IndiceMortalidad.query();

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        var onSaveSuccess = function (result) {
            $scope.$emit('siccApp:archivoIndiceMortalidadUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        };

        var onSaveError = function () {
            vm.isSaving = false;
        };

        vm.save = function () {
            vm.isSaving = true;
            if (vm.archivoIndiceMortalidad.id !== null) {
                ArchivoIndiceMortalidad.update(vm.archivoIndiceMortalidad, onSaveSuccess, onSaveError);
            } else {
                ArchivoIndiceMortalidad.save(vm.archivoIndiceMortalidad, onSaveSuccess, onSaveError);
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
