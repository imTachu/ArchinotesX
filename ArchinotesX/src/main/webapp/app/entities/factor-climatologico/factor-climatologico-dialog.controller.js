(function() {
    'use strict';

    angular
        .module('archinotesxApp')
        .controller('FactorClimatologicoDialogController', FactorClimatologicoDialogController);

    FactorClimatologicoDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'FactorClimatologico'];

    function FactorClimatologicoDialogController ($timeout, $scope, $stateParams, $uibModalInstance, entity, FactorClimatologico) {
        var vm = this;
        vm.factorClimatologico = entity;

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        var onSaveSuccess = function (result) {
            $scope.$emit('archinotesxApp:factorClimatologicoUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        };

        var onSaveError = function () {
            vm.isSaving = false;
        };

        vm.save = function () {
            vm.isSaving = true;
            if (vm.factorClimatologico.id !== null) {
                FactorClimatologico.update(vm.factorClimatologico, onSaveSuccess, onSaveError);
            } else {
                FactorClimatologico.save(vm.factorClimatologico, onSaveSuccess, onSaveError);
            }
        };

        vm.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };
    }
})();
