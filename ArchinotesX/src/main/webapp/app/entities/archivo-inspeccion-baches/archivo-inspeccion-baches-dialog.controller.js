(function() {
    'use strict';

    angular
        .module('siccApp')
        .controller('ArchivoInspeccionBachesDialogController', ArchivoInspeccionBachesDialogController);

    ArchivoInspeccionBachesDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'ArchivoInspeccionBaches', 'EstadoBaches'];

    function ArchivoInspeccionBachesDialogController ($timeout, $scope, $stateParams, $uibModalInstance, entity, ArchivoInspeccionBaches, EstadoBaches) {
        var vm = this;
        vm.archivoInspeccionBaches = entity;
        vm.estadobaches = EstadoBaches.query();

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        var onSaveSuccess = function (result) {
            $scope.$emit('siccApp:archivoInspeccionBachesUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        };

        var onSaveError = function () {
            vm.isSaving = false;
        };

        vm.save = function () {
            vm.isSaving = true;
            if (vm.archivoInspeccionBaches.id !== null) {
                ArchivoInspeccionBaches.update(vm.archivoInspeccionBaches, onSaveSuccess, onSaveError);
            } else {
                ArchivoInspeccionBaches.save(vm.archivoInspeccionBaches, onSaveSuccess, onSaveError);
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
