(function() {
    'use strict';

    angular
        .module('archinotesxApp')
        .controller('PeajeDialogController', PeajeDialogController);

    PeajeDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'Peaje', 'Tramo'];

    function PeajeDialogController ($timeout, $scope, $stateParams, $uibModalInstance, entity, Peaje, Tramo) {
        var vm = this;
        vm.peaje = entity;
        vm.tramos = Tramo.query();

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        var onSaveSuccess = function (result) {
            $scope.$emit('archinotesxApp:peajeUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        };

        var onSaveError = function () {
            vm.isSaving = false;
        };

        vm.save = function () {
            vm.isSaving = true;
            if (vm.peaje.id !== null) {
                Peaje.update(vm.peaje, onSaveSuccess, onSaveError);
            } else {
                Peaje.save(vm.peaje, onSaveSuccess, onSaveError);
            }
        };

        vm.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };
    }
})();
