(function() {
    'use strict';

    angular
        .module('siccApp')
        .controller('EstadoBachesDialogController', EstadoBachesDialogController);
    EstadoBachesDialogController.$inject = ['DialogEstadosControllerFactory', '$scope', 'entity', 'EstadoBaches', 'inspeccionEntity', 'DateUtils', 'DialogKMAbscisaValidationImplement'];

    function EstadoBachesDialogController (DialogEstadosControllerFactory, $scope, entity, EstadoBaches, inspeccionEntity, DateUtils, DialogKMAbscisaValidationImplement) {
        var DialogEstadosController=DialogEstadosControllerFactory.create($scope, EstadoBaches, entity, inspeccionEntity);
        DialogKMAbscisaValidationImplement.implement(DialogEstadosController);
        DialogEstadosController.prototype=angular.extend(DialogEstadosController.prototype,{
            beforeSave:function(){
                entity.estadoBachesDeInspeccion = inspeccionEntity;
            },
            startWatcherIfCanToSaveEntity:function(){
                
                var vm=this;
                $scope.$watchGroup([
                    'vm.estadoBaches.kilometro', 
                    'vm.estadoBaches.abscisa', 
                    'vm.estadoBaches.costado', 
                    'vm.estadoBaches.largoInspeccion',
                    'vm.estadoBaches.anchoInspeccion',
                    'vm.estadoBaches.profundidadInspeccion',
                    'vm.estadoBaches.largoVerificacion',
                    'vm.estadoBaches.anchoVerificacion',
                    'vm.estadoBaches.profundidadVerificacion'
                ], function(){
                    vm.isInvalidToSave=false;
                    var entityForm=$scope.editForm;

                    if(!vm.isEstadoInVerification()){
                        if(!entityForm || 
                            entityForm.kilometro.$invalid ||
                            entityForm.abscisa.$invalid ||
                            entityForm.costado.$invalid ||
                            entityForm.largoInspeccion.$invalid ||
                            entityForm.anchoInspeccion.$invalid ||
                            entityForm.profundidadInspeccion.$invalid
                             ){
                            vm.isInvalidToSave=true;
                        }
                    }
                    else{
                        if(!entityForm || 
                            entityForm.kilometro.$invalid ||
                            entityForm.abscisa.$invalid ||
                            entityForm.costado.$invalid ||
                            entityForm.largoVerificacion.$invalid ||
                            entityForm.anchoVerificacion.$invalid ||
                            entityForm.profundidadVerificacion.$invalid
                             ){
                            vm.isInvalidToSave=true;
                        }
                    }
                    
                });  
            },
            initCustomValidations:function(){
                
                var vm=this;
                vm.setTramo(inspeccionEntity.tramoDeInspeccionBaches);
                vm.addKmAbscisaValidation('kilometro','abscisa');  //validaciones DialogKMAbscisaValidationImplement
            }


        });

        
        var controller=new DialogEstadosController({
            entityName:"estado-baches",
            withFinalizeState:true
        });
        return controller;
    }
})();
