(function() {
    'use strict';

    angular
        .module('siccApp')
        .controller('TipoVehiculoAfectadoDialogController', TipoVehiculoAfectadoDialogController);

    TipoVehiculoAfectadoDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'TipoVehiculoAfectado'];

    function TipoVehiculoAfectadoDialogController ($timeout, $scope, $stateParams, $uibModalInstance, entity, TipoVehiculoAfectado) {
        var vm = this;
        vm.tipoVehiculoAfectado = entity;

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        var onSaveSuccess = function (result) {
            $scope.$emit('siccApp:tipoVehiculoAfectadoUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        };

        var onSaveError = function () {
            vm.isSaving = false;
        };

        vm.save = function () {
            vm.isSaving = true;
            if (vm.tipoVehiculoAfectado.id !== null) {
                TipoVehiculoAfectado.update(vm.tipoVehiculoAfectado, onSaveSuccess, onSaveError);
            } else {
                TipoVehiculoAfectado.save(vm.tipoVehiculoAfectado, onSaveSuccess, onSaveError);
            }
        };

        vm.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };
    }
})();
