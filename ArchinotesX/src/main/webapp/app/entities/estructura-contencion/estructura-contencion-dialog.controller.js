(function() {
    'use strict';

    angular
        .module('siccApp')
        .controller('EstructuraContencionDialogController', EstructuraContencionDialogController);

    EstructuraContencionDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'EstructuraContencion', 'Tramo'];

    function EstructuraContencionDialogController ($timeout, $scope, $stateParams, $uibModalInstance, entity, EstructuraContencion, Tramo) {
        var vm = this;
        vm.estructuraContencion = entity;
        vm.tramos = Tramo.query();

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        var onSaveSuccess = function (result) {
            $scope.$emit('siccApp:estructuraContencionUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        };

        var onSaveError = function () {
            vm.isSaving = false;
        };

        vm.save = function () {
            vm.isSaving = true;
            if (vm.estructuraContencion.id !== null) {
                EstructuraContencion.update(vm.estructuraContencion, onSaveSuccess, onSaveError);
            } else {
                EstructuraContencion.save(vm.estructuraContencion, onSaveSuccess, onSaveError);
            }
        };

        vm.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };
    }
})();
