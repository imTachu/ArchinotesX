(function() {
    'use strict';

    angular
        .module('siccApp')
        .controller('CausaAccidenteDialogController', CausaAccidenteDialogController);

    CausaAccidenteDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'CausaAccidente'];

    function CausaAccidenteDialogController ($timeout, $scope, $stateParams, $uibModalInstance, entity, CausaAccidente) {
        var vm = this;
        vm.causaAccidente = entity;

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        var onSaveSuccess = function (result) {
            $scope.$emit('siccApp:causaAccidenteUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        };

        var onSaveError = function () {
            vm.isSaving = false;
        };

        vm.save = function () {
            vm.isSaving = true;
            if (vm.causaAccidente.id !== null) {
                CausaAccidente.update(vm.causaAccidente, onSaveSuccess, onSaveError);
            } else {
                CausaAccidente.save(vm.causaAccidente, onSaveSuccess, onSaveError);
            }
        };

        vm.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };
    }
})();
