(function() {
    'use strict';

    angular
        .module('siccApp')
        .controller('EstadoSenalizacionVDialogController', EstadoSenalizacionVDialogController);
    EstadoSenalizacionVDialogController.$inject = ['DialogEstadosControllerFactory', '$scope', 'entity', 'EstadoSenalizacionV', 'inspeccionEntity', 'DateUtils', 'TipoSenal', 'TIPOS_ESTRUCTURAS_HIDRAULICAS', 'DialogKMAbscisaValidationImplement', 'AnguloMedicionSenalizacionV'];

    function EstadoSenalizacionVDialogController (DialogEstadosControllerFactory, $scope, entity, EstadoSenalizacionV, inspeccionEntity, DateUtils, TipoSenal, TIPOS_ESTRUCTURAS_HIDRAULICAS, DialogKMAbscisaValidationImplement, AnguloMedicionSenalizacionV) {
        var DialogEstadosController=DialogEstadosControllerFactory.create($scope, EstadoSenalizacionV, entity, inspeccionEntity);
        DialogKMAbscisaValidationImplement.implement(DialogEstadosController);
        DialogEstadosController.prototype=angular.extend(DialogEstadosController.prototype,{
            postConstructor:function(){
                var vm=this;
                vm.inspeccionEntity=inspeccionEntity;
                vm.tipoSenalSelected=undefined;

                vm.typeHeadModelOptions = {
                    debounce: {
                        default: 500,
                        blur: 250
                    },
                    getterSetter: true
                };

                vm.loadTiposSenal();
                vm.loadAnguloMedicion();
            },
            initCustomValidations:function(){
                var vm=this;
                vm.setTramo(inspeccionEntity.tramoDeInspeccionSenalizacion);
                vm.addKmAbscisaValidation('kilometro','abscisa');  //validaciones DialogKMAbscisaValidationImplement
            },
            beforeSave:function(){
                //var vm=this;
                entity.senalizacionDeInspeccion = inspeccionEntity;
            },
            startWatcherIfCanToSaveEntity:function(){
                
                var vm=this;
                $scope.$watchGroup([
                    'vm.estadoSenalizacionV.kilometro', 
                    'vm.estadoSenalizacionV.abscisa', 
                    'vm.estadoSenalizacionV.margen', 
                    'vm.estadoSenalizacionV.tipoSenalDeSenalizacion', 
                    'vm.estadoSenalizacionV.anguloMedicionInspeccion', 
                    'vm.estadoSenalizacionV.amarilloInspeccion',
                    'vm.estadoSenalizacionV.blancoInspeccion',
                    'vm.estadoSenalizacionV.verdeInspeccion',
                    'vm.estadoSenalizacionV.rojoInspeccion',
                    'vm.estadoSenalizacionV.azulInspeccion',
                    'vm.estadoSenalizacionV.naranjaInspeccion',
                    'vm.estadoSenalizacionV.marronInspeccion',
                    'vm.estadoSenalizacionV.amarilloVerdeFluorescenteInspeccion',
                    'vm.estadoSenalizacionV.amarilloFluorescenteInspeccion',
                    'vm.estadoSenalizacionV.naranjaFluorescenteInspeccion',
                    'vm.estadoSenalizacionV.posLegInspeccion',
                    'vm.estadoSenalizacionV.amarilloVerificacion',
                    'vm.estadoSenalizacionV.blancoVerificacion',
                    'vm.estadoSenalizacionV.verdeVerificacion',
                    'vm.estadoSenalizacionV.rojoVerificacion',
                    'vm.estadoSenalizacionV.azulVerificacion',
                    'vm.estadoSenalizacionV.naranjaVerificacion',
                    'vm.estadoSenalizacionV.marronVerificacion',
                    'vm.estadoSenalizacionV.amarilloVerdeFluorescenteVerificacion',
                    'vm.estadoSenalizacionV.amarilloFluorescenteVerificacion',
                    'vm.estadoSenalizacionV.naranjaFluorescenteVerificacion',
                    'vm.tipoSenalOptionsSelected()'
                        //'vm.estadoSenalizacionV.posLegVerificacion',
                ], function(){
                    vm.isInvalidToSave=false;
                    var entityForm=$scope.editForm;

                    //if(!entityForm.$pristine)
                        //vm.estadoSenalizacionV.cumple=undefined;

                    vm.runColorsValidation();
                    vm.runTipoSenalValidation();

                    
                    if(!entityForm || 
                        entityForm.kilometro.$invalid ||
                        entityForm.abscisa.$invalid ||
                        entityForm.margen.$invalid ||
                        entityForm.tipoSenalDeSenalizacion.$invalid ||
                        (
                            !vm.isEstadoInVerification() && 
                            entityForm.amarilloInspeccion.$invalid &&
                            entityForm.blancoInspeccion.$invalid &&
                            entityForm.verdeInspeccion.$invalid &&
                            entityForm.rojoInspeccion.$invalid &&
                            entityForm.azulInspeccion.$invalid &&
                            entityForm.naranjaInspeccion.$invalid &&
                            entityForm.marronInspeccion.$invalid &&
                            entityForm.amarilloVerdeFluorescenteInspeccion.$invalid &&
                            entityForm.amarilloFluorescenteInspeccion.$invalid &&
                            entityForm.naranjaFluorescenteInspeccion.$invalid ||
                            entityForm.anguloMedicionInspeccion.$invalid 
                        )
                        ||
                        (
                            vm.isEstadoInVerification() && 
                            entityForm.amarilloVerificacion.$invalid &&
                            entityForm.blancoVerificacion.$invalid &&
                            entityForm.verdeVerificacion.$invalid &&
                            entityForm.rojoVerificacion.$invalid &&
                            entityForm.azulVerificacion.$invalid &&
                            entityForm.naranjaVerificacion.$invalid &&
                            entityForm.marronVerificacion.$invalid &&
                            entityForm.amarilloVerdeFluorescenteVerificacion.$invalid &&
                            entityForm.amarilloFluorescenteVerificacion.$invalid &&
                            entityForm.naranjaFluorescenteVerificacion.$invalid ||
                            entityForm.anguloMedicionVerificacion.$invalid 
                        ) 
                         ){
                        vm.isInvalidToSave=true;
                    }
                    
                    
                    
                });    
            },
            runTipoSenalValidation:function(){
                var vm=this;
                var tipoSenalIsSelected= !! vm.estadoSenalizacionV.tipoSenalDeSenalizacion;
                var form=$scope.editForm;
                if(!form) return;
                var formField=form['tipoSenalDeSenalizacion'];
                if(!formField) return;
                formField.$setValidity('debeEscogerTipoSenal', true);
                if(!formField.$error.required){
                    formField.$setValidity('debeEscogerTipoSenal', tipoSenalIsSelected );
                }
            },
            runColorsValidation:function(){
                var vm=this;
                var form=$scope.editForm;
                if(form){
                    var fields=[], colorChoosedCount=0, noColorsFilled=false;
                    if(!vm.isEstadoInVerification()){
                        fields=['amarilloInspeccion','blancoInspeccion','verdeInspeccion','rojoInspeccion','azulInspeccion', 'naranjaInspeccion', 
                        'marronInspeccion', 'amarilloVerdeFluorescenteInspeccion', 'amarilloFluorescenteInspeccion', 'naranjaFluorescenteInspeccion'];
                        angular.forEach(fields, function(field) {
                            if(entity[field] && !isNaN(entity[field]) && entity[field]>=0)
                                colorChoosedCount++;
                        });
                        noColorsFilled=colorChoosedCount===0;
                        angular.forEach(fields, function(field) {
                            form[field].$setValidity('debeEscogerAlMenosUnColor', !noColorsFilled);
                        }); 
                    }
                    else{
                        fields=['amarilloVerificacion','blancoVerificacion','verdeVerificacion','rojoVerificacion','azulVerificacion', 'naranjaVerificacion', 
                        'marronVerificacion', 'amarilloVerdeFluorescenteVerificacion', 'amarilloFluorescenteVerificacion', 'naranjaFluorescenteVerificacion'];
                        angular.forEach(fields, function(field) {
                            if(entity[field] && !isNaN(entity[field]) && entity[field]>=0)
                                colorChoosedCount++;
                        });
                        noColorsFilled=colorChoosedCount===0;
                        angular.forEach(fields, function(field) {
                            form[field].$setValidity('debeEscogerAlMenosUnColor', !noColorsFilled);
                        }); 
                        
                    }
                    
                }
            },
            loadTiposSenal:function(){
                var vm=this;
                TipoSenal.queryAll({
                }).$promise.then(function(results){
                    angular.forEach(results, function(item, index) {
                        item.label=vm.getTipoSenalLabel(item);
                    });
                    vm.tiposenals = results;
                });

                vm.tipoSenalSelected=vm.getTipoSenalLabel(vm.estadoSenalizacionV.tipoSenalDeSenalizacion);
                
            },
            loadAnguloMedicion: function(){
                var vm = this;
                AnguloMedicionSenalizacionV.queryAll({
                }, function(results){
                    vm.angulosMedicion = results;
                });
            },
            populateFormFields:function(value){
                //var vm=this;
                if(angular.isObject(value)){
                    entity.tipoSenalDeSenalizacion = value;
                    var tipoSenalObj=value;
                    entity.kilometro = tipoSenalObj.kilometro;
                    entity.abscisa = tipoSenalObj.abscisa;
                    entity.margen = tipoSenalObj.margenSenal;
                }
                else{
                    entity.tipoSenalDeSenalizacion = undefined;
                    entity.kilometro = null;
                    entity.abscisa = null;
                    entity.margen = null;
                }
            },
            getTipoSenalLabel:function(item){
                if(item){
                    var labels=[];
                    labels.push("Km "+item.kilometro);
                    labels.push("Ab "+item.abscisa);
                    labels.push("Tipo "+item.tipoSenal);
                    labels.push("Margen: "+item.margenSenal);
                    return labels.join(' - ');
                }
                return '';
            },
            tipoSenalOptionsSelected : function(value) {
                var vm=this;
                if (arguments.length) {
                    vm.tipoSenalSelected=value;
                    vm.populateFormFields(value);
                    
                } else {
                    return vm.tipoSenalSelected;
                }
            }
        });

        
        var controller=new DialogEstadosController({
            entityName:"estado-senalizacion-v",
            withFinalizeState:true
        });
        return controller;
    }
})();
