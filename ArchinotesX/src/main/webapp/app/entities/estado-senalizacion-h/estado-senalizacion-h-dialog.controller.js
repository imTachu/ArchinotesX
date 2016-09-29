(function() {
    'use strict';

    angular
        .module('archinotesxApp')
        .controller('EstadoSenalizacionHDialogController', EstadoSenalizacionHDialogController);
    EstadoSenalizacionHDialogController.$inject = ['DialogEstadosControllerFactory', '$scope', 'entity', 'EstadoSenalizacionH', 'inspeccionEntity', 'DateUtils', 'DialogKMAbscisaValidationImplement'];

    function EstadoSenalizacionHDialogController (DialogEstadosControllerFactory, $scope, entity, EstadoSenalizacionH, inspeccionEntity, DateUtils, DialogKMAbscisaValidationImplement) {
        var DialogEstadosController=DialogEstadosControllerFactory.create($scope, EstadoSenalizacionH, entity, inspeccionEntity);
        DialogKMAbscisaValidationImplement.implement(DialogEstadosController);
        DialogEstadosController.prototype=angular.extend(DialogEstadosController.prototype,{
            beforeSave:function(){
                entity.senalizacionDeInspeccion = inspeccionEntity;
            },
            startWatcherIfCanToSaveEntity:function(){
                
                var vm=this;
                $scope.$watchGroup([
                    'vm.estadoSenalizacionH.kilometroInicial', 
                    'vm.estadoSenalizacionH.abscisaInicial',
                    'vm.estadoSenalizacionH.kilometroFinal', 
                    'vm.estadoSenalizacionH.abscisaFinal', 
                    'vm.estadoSenalizacionH.lineaInspeccion', 
                    'vm.estadoSenalizacionH.tipoLineaInspeccion',
                    'vm.estadoSenalizacionH.promedioInspeccion',
                    'vm.estadoSenalizacionH.lineaVerificacion', 
                    'vm.estadoSenalizacionH.tipoLineaVerificacion',
                    'vm.estadoSenalizacionH.promedioVerificacion'
                ], function(){
                    vm.isInvalidToSave=false;
                    vm.showUserToSaveMessage=false;
                    var entityForm=$scope.editForm;

                    if(!vm.isEstadoInVerification()){
                        if(!entityForm || 
                            entityForm.kilometroInicial.$invalid ||
                            entityForm.abscisaInicial.$invalid ||
                            entityForm.kilometroFinal.$invalid ||
                            entityForm.abscisaFinal.$invalid ||
                            entityForm.lineaInspeccion.$invalid ||
                            entityForm.tipoLineaInspeccion.$invalid ||
                            entityForm.promedioInspeccion.$invalid
                             ){
                            vm.isInvalidToSave=true;
                        }
                    }
                    else{
                        if(!entityForm || 
                            entityForm.kilometroInicial.$invalid ||
                            entityForm.abscisaInicial.$invalid ||
                            entityForm.kilometroFinal.$invalid ||
                            entityForm.abscisaFinal.$invalid ||
                            entityForm.lineaVerificacion.$invalid ||
                            entityForm.tipoLineaVerificacion.$invalid ||
                            entityForm.promedioVerificacion.$invalid
                             ){
                            vm.isInvalidToSave=true;
                        }
                    }


                    if(entityForm && !entityForm.$pristine){
                        vm.showUserToSaveMessage=true;
                    }
                    
                });   
            },
            initCustomValidations:function(){
                var vm=this;
                vm.setTramo(inspeccionEntity.tramoDeInspeccionSenalizacion);
                vm.addKmAbscisaValidation('kilometroInicial','abscisaInicial');  //validaciones DialogKMAbscisaValidationImplement
                vm.addKmAbscisaValidation('kilometroFinal','abscisaFinal');  //validaciones DialogKMAbscisaValidationImplement
            }


        });

        
        var controller=new DialogEstadosController({
            entityName:"estado-senalizacion-h",
            withFinalizeState:true
        });
        return controller;
    }
})();
