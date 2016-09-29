(function() {
    'use strict';

    angular
        .module('archinotesxApp')
        .controller('ColaPeajeDetalleDialogController', ColaPeajeDetalleDialogController);

    ColaPeajeDetalleDialogController.$inject = ['DialogDetailsEntityControllerFactory', '$scope', 'entity', 'ColaPeajeDetalle', 'colaPeaje', 'DateUtils'];

    function ColaPeajeDetalleDialogController (DialogDetailsEntityControllerFactory, $scope, entity, ColaPeajeDetalle, colaPeaje, DateUtils) {
        
        var EntityDialogController=DialogDetailsEntityControllerFactory.create($scope, ColaPeajeDetalle, entity, colaPeaje);
        EntityDialogController.prototype=angular.extend(EntityDialogController.prototype,{
            beforeSave:function(){
                //var vm=this;
                entity.detalleDeColaPeaje=colaPeaje;
            },
            startWatcherIfCanToSaveEntity:function(){
                $scope.$watchGroup(['vm.colaPeajeDetalle.fechaInicial', 'vm.colaPeajeDetalle.fechaFinal'], function() {
                    var form = $scope.editForm;
                    if (form) {
                        var validateField = function(fieldName) {
                            return DateUtils.isValidDate(entity[fieldName]);
                        };
                        var allDatesAreValid = validateField('fechaInicial');
                        allDatesAreValid = validateField('fechaFinal') && allDatesAreValid;


                        form.fechaFinal.$setValidity('fechaFinalNoEsMayor', true);
                        if (allDatesAreValid && entity.fechaFinal < entity.fechaInicial) {
                            form.fechaFinal.$setValidity('fechaFinalNoEsMayor', false);
                        }
                    }
                }); 
            },
            initDatePickerFields:function(){
                var vm=this;
                vm.datePickerOpenStatus = {};
                vm.datePickerOpenStatus.fechaInicial = false;
                vm.datePickerOpenStatus.fechaFinal = false;
            }

        });

        
        var controller=new EntityDialogController({
            entityName:"cola-peaje-detalle",
            withFinalizeState:false,
            withBackButton:true
        });
        return controller;
    }
})();
