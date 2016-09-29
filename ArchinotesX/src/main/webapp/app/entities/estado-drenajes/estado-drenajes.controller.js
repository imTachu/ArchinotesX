(function() {
    'use strict';

    angular
        .module('archinotesxApp')
        .controller('EstadoDrenajesController', EstadoDrenajesController);

    EstadoDrenajesController.$inject = ['EstadosListControllerFactory', '$scope', 'pagingParams', 'EstadoDrenajes', 'inspeccionDrenajes'];

    function EstadoDrenajesController (EstadosListControllerFactory, $scope, pagingParams, EstadoDrenajes, inspeccionDrenajes) {
        var EstadosListController=EstadosListControllerFactory.create($scope, pagingParams, EstadoDrenajes, inspeccionDrenajes);
        var controller=new EstadosListController({
            title:"Estados de drenajes",
            entityName:"estado-drenajes",
            parentEntityType:"inspeccion-drenajes",
            sortable:true,
            getColumnsConfig:function(controller){
                return {
                    fields:[
                        {
                            sortBy:'id', 
                            label:"ID", 
                            value:function(item){
                                return item.id;
                            }
                        },
                        {
                            sortBy:'estado', 
                            label:"Estado", 
                            value:function(item){
                                return item.estado;
                            }
                        },
                        {
                            sortBy:'cumple', 
                            label:"¿Ha cumplido?", 
                            value:function(item){
                                return item.cumple;
                            },
                            asIndicadorCumple:true
                        },
                        {
                            sortBy:'kilometro', 
                            label:"Kilómetro", 
                            value:function(item){
                                return item.kilometro;
                            }
                        },
                        {
                            sortBy:'abscisa', 
                            label:"Abscisa", 
                            value:function(item){
                                return item.abscisa;
                            }
                        },
                        {
                            sortBy:'colmatacionInspeccion', 
                            label:" % Colmatación Inspección", 
                            value:function(item){
                                return item.colmatacionInspeccion;
                            }
                        },
                        {
                            sortBy:'colmatacionVerificacion', 
                            label:" % Colmatación Verificación", 
                            value:function(item){
                                return item.colmatacionVerificacion;
                            }
                        }
                    ],
                    editLink:function(item){
                        return{
                            state:controller.getOptions().entityName+'.edit',
                            stateParams:{id_estado_drenajes:item.id},
                            isDisabled:function(){
                                return controller.isFinalizedEntity(item);
                            }
                        };   
                    }
                };
            }
        });
        
        return controller;
    }
})();
