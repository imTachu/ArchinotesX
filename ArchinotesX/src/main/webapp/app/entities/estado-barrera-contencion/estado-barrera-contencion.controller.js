(function() {
    'use strict';

    angular
        .module('siccApp')
        .controller('EstadoBarreraContencionController', EstadoBarreraContencionController);

    EstadoBarreraContencionController.$inject = ['EstadosListControllerFactory', '$scope', 'pagingParams', 'EstadoBarreraContencion', 'inspeccionBarreraContencion'];

    function EstadoBarreraContencionController (EstadosListControllerFactory, $scope, pagingParams, EstadoBarreraContencion, inspeccionBarreraContencion) {
        var EstadosListController=EstadosListControllerFactory.create($scope, pagingParams, EstadoBarreraContencion, inspeccionBarreraContencion);
        var controller=new EstadosListController({
            title:"Estados de barreras de contención",
            entityName:"estado-barrera-contencion",
            parentEntityType:"inspeccion-barrera-contencion",
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
                            sortBy:'kilometroInicial', 
                            label:"Km. Inicial", 
                            value:function(item){
                                return item.kilometroInicial;
                            }
                        },
                        {
                            sortBy:'abscisaInicial', 
                            label:"Abscisa Inicial", 
                            value:function(item){
                                return item.abscisaInicial;
                            }
                        },
                        {
                            sortBy:'kilometroFinal', 
                            label:"Km. Final", 
                            value:function(item){
                                return item.kilometroFinal;
                            }
                        },
                        {
                            sortBy:'abscisaFinal', 
                            label:"Abscisa Final", 
                            value:function(item){
                                return item.abscisaFinal;
                            }
                        }
                    ],
                    editLink:function(item){
                        return{
                            state:controller.getOptions().entityName+'.edit',
                            stateParams:{id_estado_barrera_contencion:item.id},
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
