(function() {
    'use strict';

    angular
        .module('archinotesxApp')
        .controller('AccidenteDialogController', AccidenteDialogController);

    AccidenteDialogController.$inject = ['EntityDialogControllerFactory', '$scope', 'entity', 'Accidente', 'InfraestructuraAfectada', 'CausaAccidente', 'TipoAccidente', 'FactorClimatologico', 'TipoNovedadAccidente', 'Tramo', 'DateUtils', 'DialogKMAbscisaValidationImplement'];

    function AccidenteDialogController (EntityDialogControllerFactory, $scope, entity, Accidente, InfraestructuraAfectada, CausaAccidente, TipoAccidente, FactorClimatologico, TipoNovedadAccidente, Tramo, DateUtils, DialogKMAbscisaValidationImplement) {
        var EntityDialogController=EntityDialogControllerFactory.create($scope, Accidente, entity);
        DialogKMAbscisaValidationImplement.implement(EntityDialogController);
        var TIPO_ACCIDENTE={
            LATAS:'Latas',
            HERIDOS:'Heridos',
            MUERTOS:'Muertos'        
        };
        EntityDialogController.prototype=angular.extend(EntityDialogController.prototype,{

            postConstructor:function(){
                var vm=this;
                vm.infraestructuraafectadas = InfraestructuraAfectada.query();
                vm.causaaccidentes = CausaAccidente.query();
                vm.tipoaccidentes = TipoAccidente.query();
                vm.factorclimatologicos = FactorClimatologico.query();
                vm.tiponovedadaccidentes = TipoNovedadAccidente.query();
                vm.tramos = Tramo.query();
                
            },
            initDatePickerFields:function(){
                var vm=this;
                vm.datePickerOpenStatus = {};
                vm.datePickerOpenStatus.fechaRecepcionLlamada = false;
                vm.datePickerOpenStatus.fechaLlegadaSenalizacion = false;
                vm.datePickerOpenStatus.fechaLlegadaAmbulancia = false;
                vm.datePickerOpenStatus.fechaLlegadaVehiculoApoyo = false;
                vm.datePickerOpenStatus.fechaLlegadaFinDespeje = false;
                vm.datePickerOpenStatus.fechaInicioCierreVia = false;
                vm.datePickerOpenStatus.fechaFinCierreVia = false;
            },
            startWatcherIfCanToSaveEntity:function(){
                
                var vm=this;
                $scope.$watchGroup([
                    'vm.accidente.tipoDeAccidente', 
                    'vm.accidente.tramoDeAccidente', 
                    'vm.accidente.kilometro', 
                    'vm.accidente.abscisa',
                    'vm.accidente.nombrePersonaQueReporta',
                    'vm.accidente.telefonoPersonaQueReporta'
                ], function(){
                    vm.isInvalidToSave=false;
                    var entityForm=$scope.editForm;
                    if(!entityForm || entityForm.tipoDeAccidente.$invalid || 
                        entityForm.tramoDeAccidente.$invalid ||
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
                vm.setTramo(vm.entity.tramoDeAccidente); //validaciones DialogKMAbscisaValidationImplement
                vm.trackTramoToValidateKM('tramoDeAccidente'); //validaciones DialogKMAbscisaValidationImplement
                vm.addKmAbscisaValidation('kilometro','abscisa');  //validaciones DialogKMAbscisaValidationImplement
                $scope.$watchGroup(['vm.accidente.fechaLlegadaSenalizacion', 'vm.accidente.fechaLlegadaAmbulancia', 'vm.accidente.fechaLlegadaVehiculoApoyo', 'vm.accidente.fechaLlegadaFinDespeje'], function(){
                    var form=$scope.editForm;
                    if(vm.accidente.id && form){

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


                        var allDatesAreValid=validateField('fechaLlegadaSenalizacion');
                        allDatesAreValid = validateField('fechaLlegadaAmbulancia') && allDatesAreValid;
                        allDatesAreValid = validateField('fechaLlegadaVehiculoApoyo') && allDatesAreValid;
                        allDatesAreValid = validateField('fechaLlegadaFinDespeje') && allDatesAreValid;


                        form.fechaLlegadaFinDespeje.$setValidity('fechaDespejeNoEsMayor', true);
                        if(allDatesAreValid && 
                            (
                                entity.fechaLlegadaFinDespeje<entity.fechaLlegadaSenalizacion ||
                                entity.fechaLlegadaFinDespeje<entity.fechaLlegadaAmbulancia ||
                                entity.fechaLlegadaFinDespeje<entity.fechaLlegadaVehiculoApoyo
                            )){
                            form.fechaLlegadaFinDespeje.$setValidity('fechaDespejeNoEsMayor', false);
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
                /*$scope.$watch('vm.accidente.id', function(){
                    if(vm.accidente.id){
                        establecerFechaPorDefecto(vm.accidente,'fechaLlegadaSenalizacion');
                        establecerFechaPorDefecto(vm.accidente,'fechaLlegadaAmbulancia');
                        establecerFechaPorDefecto(vm.accidente,'fechaLlegadaVehiculoApoyo');
                        establecerFechaPorDefecto(vm.accidente,'fechaLlegadaFinDespeje');
                    }
                });*/
            },
            necesitaValidarHoraAmbulancia:function(){
                var vm=this;
                if(vm.accidente && vm.accidente.tipoDeAccidente && vm.accidente.tipoDeAccidente.tipoAccidente){
                    var tipoAccidente=vm.accidente.tipoDeAccidente.tipoAccidente;
                    return vm.accidente.id>0 && (tipoAccidente === TIPO_ACCIDENTE.HERIDOS || tipoAccidente === TIPO_ACCIDENTE.MUERTOS);    
                }
                return false;        
            }


        });

        
        var controller=new EntityDialogController({
            entityName:"accidente",
            withFinalizeState:true
        });
        return controller;
    }
})();

