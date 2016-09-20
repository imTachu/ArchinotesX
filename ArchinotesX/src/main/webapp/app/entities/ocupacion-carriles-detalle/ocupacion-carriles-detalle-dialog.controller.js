(function() {
    'use strict';

    angular
        .module('siccApp')
        .controller('OcupacionCarrilesDetalleDialogController', OcupacionCarrilesDetalleDialogController);

    OcupacionCarrilesDetalleDialogController.$inject = ['DialogDetailsEntityControllerFactory', '$scope', 'entity', 'OcupacionCarrilesDetalle', 'ocupacionCarriles', 'DateUtils'];

    function OcupacionCarrilesDetalleDialogController (DialogDetailsEntityControllerFactory, $scope, entity, OcupacionCarrilesDetalle, ocupacionCarriles, DateUtils) {
        var EntityDialogController=DialogDetailsEntityControllerFactory.create($scope, OcupacionCarrilesDetalle, entity, ocupacionCarriles);
        EntityDialogController.prototype=angular.extend(EntityDialogController.prototype,{
            initDatePickerFields:function(){
                var vm=this;
                vm.datePickerOpenStatus = {};
                vm.datePickerOpenStatus.fechaInicial = false;
                vm.datePickerOpenStatus.fechaFinal = false;
            },
            beforeSave:function(){
                entity.detalleDeOcupacionCarriles=ocupacionCarriles;
            },
            initCustomValidations:function(){
                //var vm=this;
                $scope.$watchGroup(['vm.ocupacionCarrilesDetalle.fechaInicial', 'vm.ocupacionCarrilesDetalle.fechaFinal'], function() {
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
            }

        });

        
        var controller=new EntityDialogController({
            entityName:"ocupacion-carriles-detalle",
            withFinalizeState:false,
            withBackButton:true
        });
        return controller;
    }
})();
