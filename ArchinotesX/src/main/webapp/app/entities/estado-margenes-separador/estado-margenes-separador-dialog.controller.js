(function() {
    'use strict';

    angular
        .module('archinotesxApp')
        .controller('EstadoMargenesSeparadorDialogController', EstadoMargenesSeparadorDialogController);
    EstadoMargenesSeparadorDialogController.$inject = ['$state', 'DialogEstadosControllerFactory', '$scope', 'entity', 'EstadoMargenesSeparador', 'inspeccionEntity', 'DateUtils', 'DialogKMAbscisaValidationImplement'];

    function EstadoMargenesSeparadorDialogController ($state, DialogEstadosControllerFactory, $scope, entity, EstadoMargenesSeparador, inspeccionEntity, DateUtils, DialogKMAbscisaValidationImplement) {
        var DialogEstadosController=DialogEstadosControllerFactory.create($scope, EstadoMargenesSeparador, entity, inspeccionEntity);
        DialogKMAbscisaValidationImplement.implement(DialogEstadosController);
        DialogEstadosController.prototype=angular.extend(DialogEstadosController.prototype,{
            beforeSave:function(){
                entity.estadoDeInspeccion = inspeccionEntity;
            },
            startWatcherIfCanToSaveEntity:function(){
                
                var vm=this;
                $scope.$watchGroup([
                    'vm.estadoMargenesSeparador.kilometro', 
                    'vm.estadoMargenesSeparador.abscisa', 
                    'vm.estadoMargenesSeparador.margen', 
                    'vm.estadoMargenesSeparador.alturaVegetacionInspeccion',
                    'vm.estadoMargenesSeparador.articulosBasuraInspeccion',
                    'vm.estadoMargenesSeparador.alturaVegetacionVerificacion',
                    'vm.estadoMargenesSeparador.articulosBasuraVerificacion'
                ], function(){
                    vm.isInvalidToSave=false;
                    var entityForm=$scope.editForm;

                    if(!vm.isEstadoInVerification()){
                        if(!entityForm || 
                            entityForm.kilometro.$invalid ||
                            entityForm.abscisa.$invalid ||
                            entityForm.margen.$invalid ||
                            entityForm.alturaVegetacionInspeccion.$invalid ||
                            entityForm.articulosBasuraInspeccion.$invalid
                             ){
                            vm.isInvalidToSave=true;
                        }
                    }
                    else{
                        if(!entityForm || 
                            entityForm.kilometro.$invalid ||
                            entityForm.abscisa.$invalid ||
                            entityForm.margen.$invalid ||
                            entityForm.alturaVegetacionVerificacion.$invalid ||
                            entityForm.articulosBasuraVerificacion.$invalid
                             ){
                            vm.isInvalidToSave=true;
                        }
                    }
                    
                });
            },
            onSaveSuccess : function(result){
                var vm=this;
                $scope.$emit('archinotesxApp:estadoMargenesSeparadorUpdate', result);
                $state.go('estado-margenes-separador.edit', {id_estado_margenes: result.id});
                vm.isSaving = false;
            },
            onSaveToSendToConfirmation : function(result){
                var vm=this;
                $state.go('estado-margenes-separador-confirmation', {id_estado_margenes: result.id});
                vm.isSaving = false;
            },
            initCustomValidations:function(){
                var vm=this;
                vm.setTramo(inspeccionEntity.tramoDeInspeccion);
                vm.addKmAbscisaValidation('kilometro','abscisa');  //validaciones DialogKMAbscisaValidationImplement
            }


        });

        
        var controller=new DialogEstadosController({
            entityName:"estado-margenes-separador",
            withFinalizeState:true
        });
        return controller;
    }
})();
