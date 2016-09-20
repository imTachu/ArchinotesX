(function() {
    'use strict';
    angular
        .module('siccApp')
        .factory('DialogInspeccionControllerFactory', DialogInspeccionControllerFactory);

    DialogInspeccionControllerFactory.$inject = ['$filter', '$state', 'DialogWithParentControllerFactory', 'ENTITY_STATES', 'INSPECTION_STATES_STATUSES', 'Tramo', 'DateUtils'];

    function DialogInspeccionControllerFactory ($filter, $state, DialogWithParentControllerFactory, ENTITY_STATES, INSPECTION_STATES_STATUSES, Tramo, DateUtils) {
        function createController($scope, EntityResource, entity, inspeccionEntity, customOptions){
            var controllerOptions=angular.extend({
                entityName:'entity',
                withFinalizeState:true,
                templateURLUIDialog:"",
                withBackButton:true,
                tramoFieldName:''
            },customOptions || {});
            var DialogInspeccionController=DialogWithParentControllerFactory.create($scope, EntityResource, entity, inspeccionEntity, controllerOptions);
            DialogInspeccionController.prototype=angular.extend(DialogInspeccionController.prototype,{

                postConstructor:function(){
                    var vm=this;
                    if(!vm.getTramoFormFieldName())
                        throw Error('No se ha configurado el nombre del campo form del tramo de la inspección');
                    vm.tramos = Tramo.query();
                    vm.showMessageTramoChanged=false;
                    vm.trackTramoFieldChange();
                },
                getTramoFormFieldName:function(){
                    var vm=this;
                    return vm.getOptions().tramoFieldName;
                },
                initDatePickerFields:function(){
                    
                    var vm=this;
                    vm.datePickerOpenStatus = {};
                    vm.datePickerOpenStatus.fechaInspeccion = false;
                    vm.datePickerOpenStatus.fechaVerificacion = false;
                },
                startWatcherIfCanToSaveEntity:function(){
                    
                    var vm=this;
                    $scope.$watchGroup(
                        [
                            'vm.entity.'+vm.getTramoFormFieldName(), 
                            'vm.entity.fechaInspeccion'
                        ], function() {
                        vm.isInvalidToSave = false;
                        var entityForm = $scope.editForm;
                        var tramoInspeccionFormField = entityForm[vm.getTramoFormFieldName()];
                        if (!entityForm || tramoInspeccionFormField.$invalid ||
                            entityForm.fechaInspeccion.$invalid) {
                            vm.isInvalidToSave = true;
                        }
                    });
                },
                initCustomValidations:function(){
                    
                    //var vm=this;
                    $scope.$watchGroup(['vm.entity.fechaInspeccion', 'vm.entity.fechaVerificacion'], function() {
                        var form = $scope.editForm;
                        if (entity.id && form) {
                            var validateField = function(fieldName) {
                                return DateUtils.isValidDate(entity[fieldName]);
                            };
                            var allDatesAreValid = validateField('fechaInspeccion');
                            allDatesAreValid = validateField('fechaVerificacion') && allDatesAreValid;


                            form.fechaVerificacion.$setValidity('fechaVerificacionNoEsMayor', true);
                            if (allDatesAreValid && entity.fechaVerificacion < entity.fechaInspeccion) {
                                form.fechaVerificacion.$setValidity('fechaVerificacionNoEsMayor', false);
                            }
                        }
                    });
                },
                trackTramoFieldChange:function(){
                    var vm=this;
                    
                    $scope.$watchGroup(['vm.entity.'+vm.getTramoFormFieldName()], function() {
                        var form = $scope.editForm;
                        if(form.$dirty)
                            vm.showMessageTramoChanged=true;
                    });
                }
            });

            return DialogInspeccionController;
        }

        return {
            create:createController
        };

    }
})();
