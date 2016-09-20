(function() {
    'use strict';

    angular
        .module('siccApp')
        .controller('TipoIncidenteDialogController', TipoIncidenteDialogController);

    TipoIncidenteDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'TipoIncidente'];

    function TipoIncidenteDialogController ($timeout, $scope, $stateParams, $uibModalInstance, entity, TipoIncidente) {
        var vm = this;
        vm.tipoIncidente = entity;

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        var onSaveSuccess = function (result) {
            $scope.$emit('siccApp:tipoIncidenteUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        };

        var onSaveError = function () {
            vm.isSaving = false;
        };

        vm.save = function () {
            vm.isSaving = true;
            if (vm.tipoIncidente.id !== null) {
                TipoIncidente.update(vm.tipoIncidente, onSaveSuccess, onSaveError);
            } else {
                TipoIncidente.save(vm.tipoIncidente, onSaveSuccess, onSaveError);
            }
        };

        vm.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };
    }
})();
