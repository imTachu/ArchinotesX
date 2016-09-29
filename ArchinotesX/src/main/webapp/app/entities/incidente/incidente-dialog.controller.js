(function() {
    'use strict';

    angular
        .module('archinotesxApp')
        .controller('IncidenteDialogController', IncidenteDialogController);

    IncidenteDialogController.$inject = ['$q', 'EntityDialogControllerFactory', '$scope', 'entity', 'Incidente', 'InfraestructuraAfectada', 'CausaIncidente', 'TipoIncidente', 'FactorClimatologico', 'Tramo', 'DateUtils', 'DialogKMAbscisaValidationImplement'];

    function IncidenteDialogController ($q, EntityDialogControllerFactory, $scope, entity, Incidente, InfraestructuraAfectada, CausaIncidente, TipoIncidente, FactorClimatologico, Tramo, DateUtils, DialogKMAbscisaValidationImplement) {
        var EntityDialogController=EntityDialogControllerFactory.create($scope, Incidente, entity);
        DialogKMAbscisaValidationImplement.implement(EntityDialogController);
        EntityDialogController.prototype=angular.extend(EntityDialogController.prototype,{

            postConstructor:function(){
                var vm=this;
                vm.infraestructuraafectadas = InfraestructuraAfectada.query();
                vm.causaincidentes = CausaIncidente.query();
                vm.tipoincidentes = TipoIncidente.query();
                vm.factorclimatologicos = FactorClimatologico.query();
                vm.tramos = Tramo.query();
                $q.all([vm.causaincidentes.$promise, vm.tipoincidentes.$promise]).then(vm.filterCausesByType.bind(vm));
                
            },
            initDatePickerFields:function(){
                var vm=this;
                vm.datePickerOpenStatus = {};
                vm.datePickerOpenStatus.fechaRecepcionLlamada = false;
                vm.datePickerOpenStatus.fechaInicioSenalizacion = false;
                vm.datePickerOpenStatus.fechaFinSenalizacion = false;
                vm.datePickerOpenStatus.fechaInicioDespeje = false;
                vm.datePickerOpenStatus.fechaFinDespeje = false;
                vm.datePickerOpenStatus.fechaInicioCierreVia = false;
                vm.datePickerOpenStatus.fechaFinCierreVia = false;
            },
            startWatcherIfCanToSaveEntity:function(){
                
                var vm=this;
                $scope.$watchGroup([
                    'vm.incidente.tipoDeIncidente', 
                    'vm.incidente.tramoDeIncidente', 
                    'vm.incidente.kilometro', 
                    'vm.incidente.abscisa',
                    'vm.incidente.nombrePersonaQueReporta',
                    'vm.incidente.telefonoPersonaQueReporta'
                ], function(){
                    vm.isInvalidToSave=false;
                    var entityForm=$scope.editForm;
                    if(!entityForm || entityForm.tipoDeIncidente.$invalid || 
                        entityForm.tramoDeIncidente.$invalid ||
                        entityForm.kilometro.$invalid ||
                        entityForm.abscisa.$invalid ||
                        entityForm.nombrePersonaQueReporta.$invalid ||
                        entityForm.telefonoPersonaQueReporta.$invalid
                         ){
                        vm.isInvalidToSave=true;
                    }
                });  
            },
            initCustomValidations:function(){
                
                var vm=this;
                vm.setTramo(vm.entity.tramoDeIncidente);
                vm.trackTramoToValidateKM('tramoDeIncidente'); //validaciones DialogKMAbscisaValidationImplement
                vm.addKmAbscisaValidation('kilometro','abscisa');  //validaciones DialogKMAbscisaValidationImplement


                $scope.$watchGroup(['vm.incidente.fechaInicioSenalizacion', 'vm.incidente.fechaFinDespeje'], function(){
                    var form=$scope.editForm;
                    if(vm.incidente.id && form){
                        var validateField=function(fieldName){
                            
                            var fechaRecepcionLlamada=entity.fechaRecepcionLlamada;
                            form[fieldName].$setValidity('invalidFechaRecepcion', true);
                            form[fieldName].$setValidity('fechaMenorAFechaRegistro', true);
                        
                            if(!DateUtils.isValidDate(entity.fechaRecepcionLlamada)){
                                form[fieldName].$setValidity('invalidFechaRecepcion', false);
                                return false;
                            }
                            else if (DateUtils.isValidDate(entity[fieldName]) &&  entity[fieldName]<fechaRecepcionLlamada){

                                form[fieldName].$setValidity('fechaMenorAFechaRegistro', false);
                                return false;
                            }     
                            return true;
                        };
                        var allDatesAreValid=validateField('fechaInicioSenalizacion');
                        allDatesAreValid = validateField('fechaFinDespeje') && allDatesAreValid;


                        form.fechaFinDespeje.$setValidity('fechaDespejeNoEsMayor', true);
                        if(allDatesAreValid && entity.fechaFinDespeje<entity.fechaInicioSenalizacion){
                            form.fechaFinDespeje.$setValidity('fechaDespejeNoEsMayor', false);
                        }
                    }
                    
                });
                //Establecer las fechas, si no existen el valor de su fecha-date es el mismo de la fecha de registro llamada
                /*
                function establecerFechaPorDefecto(entity, key){
                    var fechaRegistroLlamada=entity.fechaRecepcionLlamada;
                    var fechaRegistroLlamadaSinHoras=DateUtils.extractDateWithoutTime(fechaRegistroLlamada);
                    if(!entity[key]){
                        entity[key]=fechaRegistroLlamadaSinHoras;
                    }
                }
                */
                //Fix por bug, la entidad no siempre llega como objeto, aveces no se resuelve bien, y llega como promise
                /*$scope.$watch('vm.incidente.id', function(){
                    if(vm.incidente.id){
                        establecerFechaPorDefecto(vm.incidente,'fechaInicioSenalizacion');
                        establecerFechaPorDefecto(vm.incidente,'fechaFinDespeje');
                    }
                });*/
            },
            filterCausesByType:function(){
                var vm=this;
                vm.causaincidentesFiltered=[];
                if(!vm.incidente.tipoDeIncidente){
                    vm.causaincidentesFiltered=vm.causaincidentes;
                    return;
                }
                    
                var tipoIncidente=vm.incidente.tipoDeIncidente.tipoIncidente;

                vm.causaincidentesFiltered=vm.causaincidentes.filter(function(item){
                    if(!tipoIncidente || !item.causaIncidente){
                        return true;
                    }
                    var causaIncidente=item.causaIncidente;
                    if(
                        (tipoIncidente==='Derrumbe' && (causaIncidente!=='Condiciones climatológicas')) ||
                        (tipoIncidente==='Caída de árbol sobre la vía' && (causaIncidente!=='Condiciones climatológicas')) ||
                        (tipoIncidente==='Caída de carga sobre la vía' && (causaIncidente==='Condiciones climatológicas')) ||
                        (tipoIncidente==='Derrame de sustancias' && (causaIncidente==='Condiciones climatológicas')) ||
                        (tipoIncidente==='Varado' && (causaIncidente!=='Deficiencia mecánica'))
                        ){
                        return false;
                    }
                    return true;
                });          
            }


        });

        
        var controller=new EntityDialogController({
            entityName:"incidente",
            withFinalizeState:true
        });
        return controller;
    }
})();

