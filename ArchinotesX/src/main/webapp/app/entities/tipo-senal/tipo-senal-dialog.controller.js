(function() {
    'use strict';

    angular
        .module('archinotesxApp')
        .controller('TipoSenalDialogController', TipoSenalDialogController);

    TipoSenalDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'TipoSenal', 'Tramo'];

    function TipoSenalDialogController ($timeout, $scope, $stateParams, $uibModalInstance, entity, TipoSenal, Tramo) {
        var vm = this;
        vm.tipoSenal = entity;
        vm.tramos = Tramo.query();

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        var onSaveSuccess = function (result) {
            $scope.$emit('archinotesxApp:tipoSenalUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        };

        var onSaveError = function () {
            vm.isSaving = false;
        };

        vm.save = function () {
            vm.isSaving = true;
            if (vm.tipoSenal.id !== null) {
                TipoSenal.update(vm.tipoSenal, onSaveSuccess, onSaveError);
            } else {
                TipoSenal.save(vm.tipoSenal, onSaveSuccess, onSaveError);
            }
        };

        vm.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };
    }
})();
