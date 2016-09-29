(function() {
    'use strict';

    angular
        .module('archinotesxApp')
        .controller('EstadoBarreraContencionDialogController', EstadoBarreraContencionDialogController);
    EstadoBarreraContencionDialogController.$inject = ['DialogEstadosControllerFactory', '$scope', 'entity', 'EstadoBarreraContencion', 'inspeccionEntity', 'DateUtils', 'EstructuraContencion', 'TIPOS_ESTRUCTURAS_HIDRAULICAS', 'DialogKMAbscisaValidationImplement'];

    function EstadoBarreraContencionDialogController (DialogEstadosControllerFactory, $scope, entity, EstadoBarreraContencion, inspeccionEntity, DateUtils, EstructuraContencion, TIPOS_ESTRUCTURAS_HIDRAULICAS, DialogKMAbscisaValidationImplement) {
        var DialogEstadosController=DialogEstadosControllerFactory.create($scope, EstadoBarreraContencion, entity, inspeccionEntity);
        DialogKMAbscisaValidationImplement.implement(DialogEstadosController);
        DialogEstadosController.prototype=angular.extend(DialogEstadosController.prototype,{
            postConstructor:function(){
                var vm=this;
                vm.inspeccionEntity=inspeccionEntity;
                vm.estructuraSelected=undefined;

                vm.typeHeadModelOptions = {
                    debounce: {
                        default: 500,
                        blur: 250
                    },
                    getterSetter: true
                };

                vm.loadEstructurasContencion();
            },
            initCustomValidations:function(){
                var vm=this;
                vm.setTramo(inspeccionEntity.tramoDeInspeccionBarrrera);
                vm.addKmAbscisaValidation('kilometroInicial','abscisaInicial');  //validaciones DialogKMAbscisaValidationImplement
                vm.addKmAbscisaValidation('kilometroFinal','abscisaFinal');  //validaciones DialogKMAbscisaValidationImplement
            },
            beforeSave:function(){
                //var vm=this;
                entity.estadoBarreraDeInspeccion = inspeccionEntity;
            },
            startWatcherIfCanToSaveEntity:function(){
                
                var vm=this;
                $scope.$watchGroup([
                    'vm.estadoBarreraContencion.kilometroInicial', 
                    'vm.estadoBarreraContencion.abscisaInicial',
                    'vm.estadoBarreraContencion.kilometroFinal', 
                    'vm.estadoBarreraContencion.abscisaFinal', 
                    'vm.estadoBarreraContencion.estructuraContencionDeInspeccion',
                    'vm.estructuraOptionsSelected()'
                ], function(){
                    vm.isInvalidToSave=false;
                    var entityForm=$scope.editForm;

                    //if(!entityForm.$pristine)
                        //vm.estadoBarreraContencion.cumple=undefined;

                    vm.runEstructuraValidation();

                    
                    if(!entityForm || 
                        entityForm.kilometroInicial.$invalid ||
                        entityForm.abscisaInicial.$invalid ||
                        entityForm.kilometroFinal.$invalid ||
                        entityForm.abscisaFinal.$invalid ||
                        entityForm.estructuraContencionDeInspeccion.$invalid
                         ){
                        vm.isInvalidToSave=true;
                    }
                    
                });   
            },
            runEstructuraValidation:function(){
                var vm=this;
                var estructuraIsSelected= !! vm.estadoBarreraContencion.estructuraContencionDeInspeccion;
                var form=$scope.editForm;
                if(!form) return;
                var formField=form['estructuraContencionDeInspeccion'];
                if(!formField) return;
                formField.$setValidity('debeEscogerEstructura', true);
                if(!formField.$error.required){
                    formField.$setValidity('debeEscogerEstructura', estructuraIsSelected );
                }
            },
            loadEstructurasContencion:function(){
                
                var vm=this;
                EstructuraContencion.queryAll({}).$promise.then(function(results){
                    angular.forEach(results, function(item, index) {
                        item.label=vm.getEstructuraLabel(item);
                    });
                    vm.estructuracontencions = results;
                });

                vm.estructuraSelected=vm.getEstructuraLabel(vm.estadoBarreraContencion.estructuraContencionDeInspeccion);
            },
            populateFormFields:function(value){
                //var vm=this;
                if(angular.isObject(value)){
                    entity.estructuraContencionDeInspeccion = value;
                    var estructuraObj=value;
                    entity.kilometroInicial = estructuraObj.kilometroInicial;
                    entity.abscisaInicial = estructuraObj.abscisaInicial;
                    entity.kilometroFinal = estructuraObj.kilometroFinal;
                    entity.abscisaFinal = estructuraObj.abscisaFinal;
                }
                else{
                    entity.estructuraContencionDeInspeccion = undefined;
                    entity.kilometroInicial = null;
                    entity.abscisaInicial = null;
                    entity.kilometroFinal = null;
                    entity.abscisaFinal = null;
                }
            },
            getEstructuraLabel:function(item){
                //var vm=this;
                if(item){
                    var labels=[];
                    labels.push("Km inicial "+item.kilometroInicial);
                    labels.push("Ab inicial "+item.abscisaInicial);
                    labels.push("Km final "+item.kilometroFinal);
                    labels.push("Ab final "+item.abscisaFinal);
                    labels.push("margen: "+item.margen);
                    //labels.push("material: "+item.material);
                    return labels.join(' - ');
                }
                return '';
            },
            estructuraOptionsSelected : function(value) {
                var vm=this;
                if (arguments.length) {
                    vm.estructuraSelected=value;
                    vm.populateFormFields(value);
                    
                } else {
                    return vm.estructuraSelected;
                }
            }


        });

        
        var controller=new DialogEstadosController({
            entityName:"estado-barrera-contencion",
            withFinalizeState:true
        });
        return controller;
    }
})();
