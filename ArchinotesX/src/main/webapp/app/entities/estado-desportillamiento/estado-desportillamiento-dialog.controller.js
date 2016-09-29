(function() {
    'use strict';

    angular
        .module('archinotesxApp')
        .controller('EstadoDesportillamientoDialogController', EstadoDesportillamientoDialogController);
    EstadoDesportillamientoDialogController.$inject = ['DialogEstadosControllerFactory', '$scope', 'entity', 'EstadoDesportillamiento', 'inspeccionEntity', 'DateUtils', 'DialogKMAbscisaValidationImplement'];

    function EstadoDesportillamientoDialogController (DialogEstadosControllerFactory, $scope, entity, EstadoDesportillamiento, inspeccionEntity, DateUtils, DialogKMAbscisaValidationImplement) {
        var DialogEstadosController=DialogEstadosControllerFactory.create($scope, EstadoDesportillamiento, entity, inspeccionEntity);
        DialogKMAbscisaValidationImplement.implement(DialogEstadosController);
        DialogEstadosController.prototype=angular.extend(DialogEstadosController.prototype,{
            beforeSave:function(){
                entity.estadoInspeccion = inspeccionEntity;
            },
            startWatcherIfCanToSaveEntity:function(){
                
                var vm=this;
                $scope.$watchGroup([
                    'vm.estadoDesportillamiento.kilometro', 
                    'vm.estadoDesportillamiento.abscisa', 
                    'vm.estadoDesportillamiento.costadoInspeccion', 
                    'vm.estadoDesportillamiento.severidadInspeccion',
                    'vm.estadoDesportillamiento.cantidadInspeccion',
                    'vm.estadoDesportillamiento.costadoVerificacion', 
                    'vm.estadoDesportillamiento.severidadVerificacion',
                    'vm.estadoDesportillamiento.cantidadVerificacion'
                ], function(){
                    vm.isInvalidToSave=false;
                    var entityForm=$scope.editForm;

                    if(!vm.isEstadoInVerification()){
                        if(!entityForm || 
                            entityForm.kilometro.$invalid ||
                            entityForm.abscisa.$invalid ||
                            entityForm.costadoInspeccion.$invalid ||
                            entityForm.severidadInspeccion.$invalid ||
                            entityForm.cantidadInspeccion.$invalid
                             ){
                            vm.isInvalidToSave=true;
                        }
                    }
                    else{
                        if(!entityForm || 
                            entityForm.kilometro.$invalid ||
                            entityForm.abscisa.$invalid ||
                            entityForm.cantidadVerificacion.$invalid
                             ){
                            vm.isInvalidToSave=true;
                        }
                    }
                    
                }); 
            },
            initCustomValidations:function(){
                var vm=this;
                vm.setTramo(inspeccionEntity.tramoDeDesportillamiento);
                vm.addKmAbscisaValidation('kilometro','abscisa');  //validaciones DialogKMAbscisaValidationImplement
            }


        });

        
        var controller=new DialogEstadosController({
            entityName:"estado-desportillamiento",
            withFinalizeState:true
        });
        return controller;
    }
})();
