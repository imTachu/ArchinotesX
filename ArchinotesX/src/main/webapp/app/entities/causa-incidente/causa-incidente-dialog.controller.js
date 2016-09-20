(function() {
    'use strict';

    angular
        .module('siccApp')
        .controller('CausaIncidenteDialogController', CausaIncidenteDialogController);

    CausaIncidenteDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'CausaIncidente'];

    function CausaIncidenteDialogController ($timeout, $scope, $stateParams, $uibModalInstance, entity, CausaIncidente) {
        var vm = this;
        vm.causaIncidente = entity;

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        var onSaveSuccess = function (result) {
            $scope.$emit('siccApp:causaIncidenteUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        };

        var onSaveError = function () {
            vm.isSaving = false;
        };

        vm.save = function () {
            vm.isSaving = true;
            if (vm.causaIncidente.id !== null) {
                CausaIncidente.update(vm.causaIncidente, onSaveSuccess, onSaveError);
            } else {
                CausaIncidente.save(vm.causaIncidente, onSaveSuccess, onSaveError);
            }
        };

        vm.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };
    }
})();
