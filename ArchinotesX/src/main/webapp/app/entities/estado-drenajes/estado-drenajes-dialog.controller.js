(function() {
    'use strict';

    angular
        .module('siccApp')
        .controller('EstadoDrenajesDialogController', EstadoDrenajesDialogController);
    EstadoDrenajesDialogController.$inject = ['DialogEstadosControllerFactory', '$scope', 'entity', 'EstadoDrenajes', 'inspeccionEntity', 'DateUtils', 'EstructuraHidraulica', 'TIPOS_ESTRUCTURAS_HIDRAULICAS', 'DialogKMAbscisaValidationImplement'];

    function EstadoDrenajesDialogController (DialogEstadosControllerFactory, $scope, entity, EstadoDrenajes, inspeccionEntity, DateUtils, EstructuraHidraulica, TIPOS_ESTRUCTURAS_HIDRAULICAS, DialogKMAbscisaValidationImplement) {
        var DialogEstadosController=DialogEstadosControllerFactory.create($scope, EstadoDrenajes, entity, inspeccionEntity);
        DialogKMAbscisaValidationImplement.implement(DialogEstadosController);
        DialogEstadosController.prototype=angular.extend(DialogEstadosController.prototype,{
            postConstructor:function(){
                var vm=this;
                vm.showUserToSaveMessage=false;
                vm.inspeccionEntity=inspeccionEntity;
                vm.isEstructuraConMargen=false;
                vm.TIPOS_ESTRUCTURA_CON_MARGEN=vm.getTiposEstructuraConMargen();
                vm.infraestructuraSelected=undefined;

                vm.typeHeadModelOptions = {
                    debounce: {
                        default: 500,
                        blur: 250
                    },
                    getterSetter: true
                };

                vm.loadEstructurasHidraulicas();
                vm.populateFormFields(vm.estadoDrenajes.infraestructuraEnDrenaje);
            },
            initCustomValidations:function(){
                var vm=this;
                vm.setTramo(inspeccionEntity.tramoDeInspeccionDrenajes);
                vm.addKmAbscisaValidation('kilometro','abscisa');  //validaciones DialogKMAbscisaValidationImplement
            },
            beforeSave:function(){
                var vm=this;
                entity.drenajesDeInspeccion = vm.inspeccionEntity;
            },
            startWatcherIfCanToSaveEntity:function(){
                
                var vm=this;
                $scope.$watchGroup([
                    'vm.estadoDrenajes.kilometro', 
                    'vm.estadoDrenajes.abscisa', 
                    'vm.estadoDrenajes.margen', 
                    'vm.estadoDrenajes.infraestructuraEnDrenaje',
                    'vm.estadoDrenajes.colmatacionInspeccion',
                    'vm.estadoDrenajes.hcolmatacionInspeccion',
                    'vm.estadoDrenajes.encoleInspeccion',
                    'vm.estadoDrenajes.descoleInspeccion',
                    'vm.estadoDrenajes.colmatacionVerificacion',
                    'vm.estadoDrenajes.hcolmatacionVerificacion',
                    'vm.estadoDrenajes.encoleVerificacion',
                    'vm.estadoDrenajes.descoleVerificacion',
                    'vm.infraestructuraOptionsSelected()'
                ], function(){
                    vm.isInvalidToSave=false;
                    vm.showUserToSaveMessage = false;
                    var entityForm=$scope.editForm;

                    //if(!entityForm.$pristine)
                        //vm.estadoDrenajes.cumple=undefined;

                    vm.runInfraestructuraValidation();

                    if(!vm.isEstadoInVerification()){
                        if(!entityForm || 
                            entityForm.kilometro.$invalid ||
                            entityForm.abscisa.$invalid ||
                            entityForm.margen.$invalid ||
                            entityForm.infraestructuraEnDrenaje.$invalid ||
                            entityForm.colmatacionInspeccion.$invalid ||
                            entityForm.hcolmatacionInspeccion.$invalid ||
                            entityForm.encoleInspeccion.$invalid ||
                            entityForm.descoleInspeccion.$invalid
                             ){
                            vm.isInvalidToSave=true;
                        }
                    }
                    else{
                        if(!entityForm || 
                            entityForm.kilometro.$invalid ||
                            entityForm.abscisa.$invalid ||
                            entityForm.margen.$invalid ||
                            entityForm.infraestructuraEnDrenaje.$invalid ||
                            entityForm.colmatacionVerificacion.$invalid ||
                            entityForm.hcolmatacionVerificacion.$invalid ||
                            entityForm.encoleVerificacion.$invalid ||
                            entityForm.descoleVerificacion.$invalid
                             ){
                            vm.isInvalidToSave=true;
                        }
                    }

                    if (entityForm && !entityForm.$pristine) {
                        vm.showUserToSaveMessage = true;
                    }
                    
                });  
            },
            runInfraestructuraValidation:function(){
                
                var vm=this;
                var infraestructuraIsSelected= !! vm.estadoDrenajes.infraestructuraEnDrenaje;
                var form=$scope.editForm;
                if(!form) return;
                var formField=form['infraestructuraEnDrenaje'];
                if(!formField) return;
                formField.$setValidity('debeEscogerInfraestructura', true);
                if(!formField.$error.required){
                    formField.$setValidity('debeEscogerInfraestructura', infraestructuraIsSelected );
                }
            },
            getTiposEstructuraConMargen:function(){
                
                //var vm=this;
                var tiposEstrucConMargen=[];
                angular.forEach(TIPOS_ESTRUCTURAS_HIDRAULICAS, function(tipo){
                    if(tipo.tieneMargen){
                        tiposEstrucConMargen.push(tipo.label);
                    }
                });
                return tiposEstrucConMargen;
            },
            loadEstructurasHidraulicas:function(){
                
                var vm=this;
                EstructuraHidraulica.queryAll({
                }).$promise.then(function(results){
                    angular.forEach(results, function(item, index) {
                        item.label=vm.getEstructuraLabel(item);
                    });
                    vm.estructurahidraulicas = results;
                });

                
                vm.infraestructuraSelected=vm.getEstructuraLabel(vm.estadoDrenajes.infraestructuraEnDrenaje);
                

                
            },
            populateFormFields:function(value){
                
                var vm=this;
                vm.isEstructuraConMargen=false;
                if(angular.isObject(value)){
                    entity.infraestructuraEnDrenaje = value;
                    var infraestructuraObj=value;
                    entity.kilometro = infraestructuraObj.kilometro;
                    entity.abscisa = infraestructuraObj.abscisa;

                    if(infraestructuraObj.estructura && vm.TIPOS_ESTRUCTURA_CON_MARGEN.indexOf(infraestructuraObj.estructura)>=0){
                        vm.isEstructuraConMargen=true;
                    }
                    else{
                        entity.margen=null;
                    }
                }
                else{
                    entity.infraestructuraEnDrenaje = undefined;
                    entity.kilometro = null;
                    entity.abscisa = null;
                    entity.margen=null;
                }
            },
            getEstructuraLabel:function(item){
                
                //var vm=this;
                if(item){
                    var labels=[];
                    labels.push("Km "+item.kilometro);
                    labels.push("Ab "+item.abscisa);
                    labels.push("Estructura: "+item.estructura);
                    return labels.join(' - ');
                }
                return '';
            },
            infraestructuraOptionsSelected : function(value) {
                
                var vm=this;
                if (arguments.length) {
                    vm.infraestructuraSelected=value;
                    vm.populateFormFields(value);
                    
                } else {
                    return vm.infraestructuraSelected;
                }
            }


        });

        
        var controller=new DialogEstadosController({
            entityName:"estado-drenajes",
            withFinalizeState:true
        });
        return controller;
    }
})();
