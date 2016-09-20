(function() {
    'use strict';

    angular
        .module('siccApp')
        .controller('TipoVehiculoApoyoDialogController', TipoVehiculoApoyoDialogController);

    TipoVehiculoApoyoDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'TipoVehiculoApoyo'];

    function TipoVehiculoApoyoDialogController ($timeout, $scope, $stateParams, $uibModalInstance, entity, TipoVehiculoApoyo) {
        var vm = this;
        vm.tipoVehiculoApoyo = entity;

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        var onSaveSuccess = function (result) {
            $scope.$emit('siccApp:tipoVehiculoApoyoUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        };

        var onSaveError = function () {
            vm.isSaving = false;
        };

        vm.save = function () {
            vm.isSaving = true;
            if (vm.tipoVehiculoApoyo.id !== null) {
                TipoVehiculoApoyo.update(vm.tipoVehiculoApoyo, onSaveSuccess, onSaveError);
            } else {
                TipoVehiculoApoyo.save(vm.tipoVehiculoApoyo, onSaveSuccess, onSaveError);
            }
        };

        vm.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };
    }
})();
