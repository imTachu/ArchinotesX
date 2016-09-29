(function() {
    'use strict';

    angular
        .module('archinotesxApp')
        .controller('ArchivoOcupacionCarrilesDialogController', ArchivoOcupacionCarrilesDialogController);

    ArchivoOcupacionCarrilesDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'ArchivoOcupacionCarriles', 'OcupacionCarriles'];

    function ArchivoOcupacionCarrilesDialogController ($timeout, $scope, $stateParams, $uibModalInstance, entity, ArchivoOcupacionCarriles, OcupacionCarriles) {
        var vm = this;
        vm.archivoOcupacionCarriles = entity;
        vm.ocupacioncarriles = OcupacionCarriles.query();

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        var onSaveSuccess = function (result) {
            $scope.$emit('archinotesxApp:archivoOcupacionCarrilesUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        };

        var onSaveError = function () {
            vm.isSaving = false;
        };

        vm.save = function () {
            vm.isSaving = true;
            if (vm.archivoOcupacionCarriles.id !== null) {
                ArchivoOcupacionCarriles.update(vm.archivoOcupacionCarriles, onSaveSuccess, onSaveError);
            } else {
                ArchivoOcupacionCarriles.save(vm.archivoOcupacionCarriles, onSaveSuccess, onSaveError);
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
