(function() {
    'use strict';

    angular
        .module('siccApp')
        .controller('IndiceMortalidadDialogController', IndiceMortalidadDialogController);

    IndiceMortalidadDialogController.$inject = ['EntityDialogControllerFactory', '$scope', 'entity', 'IndiceMortalidad', 'Tramo', 'DateUtils'];

    function IndiceMortalidadDialogController (EntityDialogControllerFactory, $scope, entity, IndiceMortalidad, Tramo, DateUtils) {
        var EntityDialogController=EntityDialogControllerFactory.create($scope, IndiceMortalidad, entity);
        EntityDialogController.prototype=angular.extend(EntityDialogController.prototype,{

            postConstructor:function(){
                //var vm=this;
                //vm.tramos = Tramo.query();
            },
            initDatePickerFields:function(){
                var vm=this;
                vm.datePickerOpenStatus = {};
                vm.datePickerOpenStatus.fechaInicial = false;
                vm.datePickerOpenStatus.fechaFinal = false;
            },
            startWatcherIfCanToSaveEntity:function(){
                
                var vm=this;
                $scope.$watchGroup(
                    [
                        //'vm.indiceMortalidad.tramoDeIndiceMortalidad',
                        'vm.indiceMortalidad.fechaInicial',
                        'vm.indiceMortalidad.fechaFinal',
                        'vm.indiceMortalidad.cantidadTrafico',
                        'vm.indiceMortalidad.numeroVictimasFatales',
                        'vm.indiceMortalidad.indiceMortalidad'
                    ],
                    function() {
                        vm.isInvalidToSave = false;
                        vm.showUserToSaveMessage = false;
                        var entityForm = $scope.editForm;
                        if (!entityForm || entityForm.$invalid) {
                            vm.isInvalidToSave = true;
                        }


                        if (entityForm && !entityForm.$pristine) {
                            vm.showUserToSaveMessage = true;
                        }


                    }
                );
            },
            initCustomValidations:function(){
                
                //var vm=this;
                $scope.$watchGroup(['vm.indiceMortalidad.fechaInicial', 'vm.indiceMortalidad.fechaFinal'], function() {
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
            entityName:"indice-mortalidad",
            withFinalizeState:true
        });
        return controller;
    }
})();
