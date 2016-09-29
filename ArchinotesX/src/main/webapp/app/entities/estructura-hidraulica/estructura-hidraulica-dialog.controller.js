(function() {
    'use strict';

    angular
        .module('archinotesxApp')
        .controller('EstructuraHidraulicaDialogController', EstructuraHidraulicaDialogController);

    EstructuraHidraulicaDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'EstructuraHidraulica', 'Tramo', 'TIPOS_ESTRUCTURAS_HIDRAULICAS'];

    function EstructuraHidraulicaDialogController ($timeout, $scope, $stateParams, $uibModalInstance, entity, EstructuraHidraulica, Tramo, TIPOS_ESTRUCTURAS_HIDRAULICAS) {
        var vm = this;
        vm.estructuraHidraulica = entity;
        vm.tramos = Tramo.query();
        vm.tiposEstructurasHidraulica=TIPOS_ESTRUCTURAS_HIDRAULICAS;

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        var onSaveSuccess = function (result) {
            $scope.$emit('archinotesxApp:estructuraHidraulicaUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        };

        var onSaveError = function () {
            vm.isSaving = false;
        };

        vm.save = function () {
            vm.isSaving = true;
            if (vm.estructuraHidraulica.id !== null) {
                EstructuraHidraulica.update(vm.estructuraHidraulica, onSaveSuccess, onSaveError);
            } else {
                EstructuraHidraulica.save(vm.estructuraHidraulica, onSaveSuccess, onSaveError);
            }
        };

        vm.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };
    }
})();
