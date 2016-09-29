(function() {
    'use strict';

    angular
        .module('archinotesxApp')
        .controller('PersonaAfectadaEnAccidenteDialogController', PersonaAfectadaEnAccidenteDialogController);

    PersonaAfectadaEnAccidenteDialogController.$inject = ['DialogOperationInfoEntityControllerFactory', '$scope', 'entity', 'PersonaAfectadaEnAccidente', 'accidente', 'TipoAfectacionPersona', 'CentroMedico', 'DateUtils'];

    function PersonaAfectadaEnAccidenteDialogController (DialogOperationInfoEntityControllerFactory, $scope, entity, PersonaAfectadaEnAccidente, accidente, TipoAfectacionPersona, CentroMedico, DateUtils) {
        var DialogOperationInfoEntityController=DialogOperationInfoEntityControllerFactory.create($scope, PersonaAfectadaEnAccidente, entity, accidente);
        DialogOperationInfoEntityController.prototype=angular.extend(DialogOperationInfoEntityController.prototype,{
            postConstructor:function(){
                var vm=this;
                vm.personaAfectadaEnAccidente = entity;
                vm.tipoafectacionpersonas = TipoAfectacionPersona.query();
                vm.centromedicos = CentroMedico.query();
            },
            beforeSave:function(){
                //var vm=this;
                entity.personaAfectadaEnAccidente = accidente;
            },
            initDatePickerFields:function(){
                var vm=this;
                vm.datePickerOpenStatus = {};
                vm.datePickerOpenStatus.fechaInicioTraslado = false;
                vm.datePickerOpenStatus.fechaFinTraslado = false;
            }

        });

        
        var controller=new DialogOperationInfoEntityController({
            entityName:"persona-afectada-en-accidente",
            withFinalizeState:false,
            withBackButton:true
        });
        return controller;
    }
})();
