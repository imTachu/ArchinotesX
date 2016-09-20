(function() {
    'use strict';

    angular
        .module('siccApp')
        .controller('ArchivoMargenesSeparadorDialogController', ArchivoMargenesSeparadorDialogController);

    ArchivoMargenesSeparadorDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'ArchivoMargenesSeparador', 'InspeccionMargenesSeparador'];

    function ArchivoMargenesSeparadorDialogController ($timeout, $scope, $stateParams, $uibModalInstance, entity, ArchivoMargenesSeparador, InspeccionMargenesSeparador) {
        var vm = this;
        vm.archivoMargenesSeparador = entity;
        vm.inspeccionmargenesseparadors = InspeccionMargenesSeparador.query();

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        var onSaveSuccess = function (result) {
            $scope.$emit('siccApp:archivoMargenesSeparadorUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        };

        var onSaveError = function () {
            vm.isSaving = false;
        };

        vm.save = function () {
            vm.isSaving = true;
            if (vm.archivoMargenesSeparador.id !== null) {
                ArchivoMargenesSeparador.update(vm.archivoMargenesSeparador, onSaveSuccess, onSaveError);
            } else {
                ArchivoMargenesSeparador.save(vm.archivoMargenesSeparador, onSaveSuccess, onSaveError);
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
