(function() {
    'use strict';

    angular
        .module('siccApp')
        .controller('ArchivoAccidenteDialogController', ArchivoAccidenteDialogController);

    ArchivoAccidenteDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$state', 'entity', 'ArchivoAccidente', 'Accidente', 'accidente'];

    function ArchivoAccidenteDialogController ($timeout, $scope, $stateParams, $state, entity, ArchivoAccidente, Accidente, accidente) {
        var vm = this;
        vm.archivoAccidente = entity;
        vm.accidentes = Accidente.query();

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        var onSaveSuccess = function (result) {
            $scope.$emit('siccApp:archivoAccidenteUpdate', result);
            //$uibModalInstance.close(result);
            vm.isSaving = false;
            $state.go('archivo-accidente', {reload:true});
        };

        var onSaveError = function () {
            vm.isSaving = false;
        };

        vm.save = function () {
            vm.isSaving = true;

            vm.archivoAccidente.archivoDeAccidente = accidente;

            if (vm.archivoAccidente.id !== null) {
                ArchivoAccidente.update(vm.archivoAccidente, onSaveSuccess, onSaveError);
            } else {
                ArchivoAccidente.save(vm.archivoAccidente, onSaveSuccess, onSaveError);
            }
        };

        vm.clear = function() {
            //$uibModalInstance.dismiss('cancel');
        };

        vm.datePickerOpenStatus = {};
        vm.datePickerOpenStatus.fechaDeRegistro = false;

        vm.openCalendar = function(date) {
            vm.datePickerOpenStatus[date] = true;
        };
    }
})();
