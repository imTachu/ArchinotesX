(function() {
    'use strict';

    angular
        .module('siccApp')
        .controller('TipoNovedadAccidenteDialogController', TipoNovedadAccidenteDialogController);

    TipoNovedadAccidenteDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'TipoNovedadAccidente'];

    function TipoNovedadAccidenteDialogController ($timeout, $scope, $stateParams, $uibModalInstance, entity, TipoNovedadAccidente) {
        var vm = this;
        vm.tipoNovedadAccidente = entity;

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        var onSaveSuccess = function (result) {
            $scope.$emit('siccApp:tipoNovedadAccidenteUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        };

        var onSaveError = function () {
            vm.isSaving = false;
        };

        vm.save = function () {
            vm.isSaving = true;
            if (vm.tipoNovedadAccidente.id !== null) {
                TipoNovedadAccidente.update(vm.tipoNovedadAccidente, onSaveSuccess, onSaveError);
            } else {
                TipoNovedadAccidente.save(vm.tipoNovedadAccidente, onSaveSuccess, onSaveError);
            }
        };

        vm.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };
    }
})();
