(function() {
    'use strict';

    angular
        .module('archinotesxApp')
        .controller('TramoDialogController', TramoDialogController);

    TramoDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'Tramo', 'KMAbscisaHelper'];

    function TramoDialogController ($timeout, $scope, $stateParams, $uibModalInstance, entity, Tramo, KMAbscisaHelper) {
        var vm = this;
        vm.tramo = entity;
        vm.kmAbscisaPattern = KMAbscisaHelper.pattern;

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        var onSaveSuccess = function (result) {
            $scope.$emit('archinotesxApp:tramoUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        };

        var onSaveError = function () {
            vm.isSaving = false;
        };

        vm.save = function () {
            vm.isSaving = true;
            if (vm.tramo.id !== null) {
                Tramo.update(vm.tramo, onSaveSuccess, onSaveError);
            } else {
                Tramo.save(vm.tramo, onSaveSuccess, onSaveError);
            }
        };

        vm.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };


        $scope.$watchGroup(['vm.tramo.origen', 'vm.tramo.destino'], function(){
            var form=$scope.editForm;
            if(form && form.$dirty){

                

                var validateKMAbField=function(fieldInputName){
                    var input=form[fieldInputName];
                    var value=entity[fieldInputName];
                    input.$setValidity('kilometroAbscisaInvalid', true);
                    if(KMAbscisaHelper.isValidPattern(value)){ //para no mostrar dos mensajes, Solo validar KM>200 despues que se cumple el pattern
                        var KMAbscisaObj=KMAbscisaHelper.getKmAbscisaObject(value);
                        if(KMAbscisaObj.km>KMAbscisaHelper.KILOMETRO_MAX){
                            input.$setValidity('kilometroAbscisaInvalid', false);
                        }
                    }
                };
                validateKMAbField('origen');
                validateKMAbField('destino');
            }
            
        });
    }
})();
