(function() {
    'use strict';

    angular
        .module('siccApp')
        .controller('TipoAfectacionPersonaDialogController', TipoAfectacionPersonaDialogController);

    TipoAfectacionPersonaDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'TipoAfectacionPersona'];

    function TipoAfectacionPersonaDialogController ($timeout, $scope, $stateParams, $uibModalInstance, entity, TipoAfectacionPersona) {
        var vm = this;
        vm.tipoAfectacionPersona = entity;

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        var onSaveSuccess = function (result) {
            $scope.$emit('siccApp:tipoAfectacionPersonaUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        };

        var onSaveError = function () {
            vm.isSaving = false;
        };

        vm.save = function () {
            vm.isSaving = true;
            if (vm.tipoAfectacionPersona.id !== null) {
                TipoAfectacionPersona.update(vm.tipoAfectacionPersona, onSaveSuccess, onSaveError);
            } else {
                TipoAfectacionPersona.save(vm.tipoAfectacionPersona, onSaveSuccess, onSaveError);
            }
        };

        vm.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };
    }
})();
