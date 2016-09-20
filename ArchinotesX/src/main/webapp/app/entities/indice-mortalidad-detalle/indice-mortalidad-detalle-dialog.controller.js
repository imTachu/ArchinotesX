(function() {
    'use strict';

    angular
        .module('siccApp')
        .controller('IndiceMortalidadDetalleDialogController', IndiceMortalidadDetalleDialogController);

    IndiceMortalidadDetalleDialogController.$inject = ['DialogDetailsEntityControllerFactory', '$scope', 'entity', 'IndiceMortalidadDetalle', 'indiceMortalidad', 'Tramo', 'DateUtils'];

    function IndiceMortalidadDetalleDialogController (DialogDetailsEntityControllerFactory, $scope, entity, IndiceMortalidadDetalle, indiceMortalidad, Tramo, DateUtils) {
        
        var EntityDialogController=DialogDetailsEntityControllerFactory.create($scope, IndiceMortalidadDetalle, entity, indiceMortalidad);
        EntityDialogController.prototype=angular.extend(EntityDialogController.prototype,{
            postConstructor:function(){
                
                var vm=this;
                vm.parentEntity=indiceMortalidad;
                vm.unidadesFuncionales = Tramo.getAllUnidadesFuncionales();
            },
            beforeSave:function(){
                //var vm=this;
                entity.detalleDeIndiceMortalidad=indiceMortalidad;
            },
            startWatcherIfCanToSaveEntity:function(){
                
                var vm=this;
                $scope.$watchGroup(
                    [
                        'vm.indiceMortalidadDetalle.unidadFuncional', 
                        'vm.indiceMortalidadDetalle.kilometroInicial', 
                        'vm.indiceMortalidadDetalle.abscisaInicial', 
                        'vm.indiceMortalidadDetalle.kilometroFinal',
                        'vm.indiceMortalidadDetalle.abscisaFinal',
                        'vm.indiceMortalidadDetalle.tramoCritico'
                    ], function(){
                    vm.isInvalidToSave=false;
                    vm.showUserToSaveMessage=false;  

                    var entityForm=$scope.editForm;
                    if(!entityForm || entityForm.$invalid){
                        vm.isInvalidToSave=true;
                    }

                    if(entityForm && !entityForm.$pristine){
                        vm.showUserToSaveMessage=true;
                    }

                    
                }); 
            }

        });

        
        var controller=new EntityDialogController({
            entityName:"indice-mortalidad-detalle",
            withFinalizeState:false,
            withBackButton:true
        });
        return controller;
    }
})();
