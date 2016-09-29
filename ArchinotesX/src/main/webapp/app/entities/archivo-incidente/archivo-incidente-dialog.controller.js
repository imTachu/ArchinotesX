(function() {
    'use strict';

    angular
        .module('archinotesxApp')
        .controller('ArchivoIncidenteDialogController', ArchivoIncidenteDialogController);

    ArchivoIncidenteDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$state', 'entity', 'ArchivoIncidente', 'Incidente', 'incidente'];

    function ArchivoIncidenteDialogController ($timeout, $scope, $stateParams, $state, entity, ArchivoIncidente, Incidente, incidente) {
        var vm = this;
        vm.archivoIncidente = entity;
        vm.incidentes = Incidente.query();

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        var onSaveSuccess = function (result) {
            $scope.$emit('archinotesxApp:archivoIncidenteUpdate', result);
            //$uibModalInstance.close(result);
            vm.isSaving = false;
            $state.go('archivo-incidente', null, {reload: true});
        };

        var onSaveError = function () {
            vm.isSaving = false;
        };

        vm.save = function () {
            vm.isSaving = true;

            vm.archivoIncidente.archivoDeIncidente = incidente;

            if (vm.archivoIncidente.id !== null) {
                ArchivoIncidente.update(vm.archivoIncidente, onSaveSuccess, onSaveError);
            } else {
                ArchivoIncidente.save(vm.archivoIncidente, onSaveSuccess, onSaveError);
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
