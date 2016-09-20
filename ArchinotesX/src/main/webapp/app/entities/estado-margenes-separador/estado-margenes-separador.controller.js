(function() {
    'use strict';

    angular
        .module('siccApp')
        .controller('EstadoMargenesSeparadorController', EstadoMargenesSeparadorController);

    EstadoMargenesSeparadorController.$inject = ['EstadosListControllerFactory', '$scope', 'pagingParams', 'EstadoMargenesSeparador', 'inspeccionMargenes'];

    function EstadoMargenesSeparadorController (EstadosListControllerFactory, $scope, pagingParams, EstadoMargenesSeparador, inspeccionMargenes) {
        var EstadosListController=EstadosListControllerFactory.create($scope, pagingParams, EstadoMargenesSeparador, inspeccionMargenes);
        var controller=new EstadosListController({
            title:"Estados de márgenes de separador",
            entityName:"estado-margenes-separador",
            parentEntityType:"inspeccion-margenes-separador",
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
                            sortBy:'margen', 
                            label:"Margen", 
                            value:function(item){
                                return item.margen;
                            }
                        }
                    ],
                    editLink:function(item){
                        return{
                            state:controller.getOptions().entityName+'.edit',
                            stateParams:{id_estado_margenes:item.id},
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
