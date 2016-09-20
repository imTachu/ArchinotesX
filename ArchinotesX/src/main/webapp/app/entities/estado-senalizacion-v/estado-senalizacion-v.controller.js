(function() {
    'use strict';

    angular
        .module('siccApp')
        .controller('EstadoSenalizacionVController', EstadoSenalizacionVController);

    EstadoSenalizacionVController.$inject = ['EstadosListControllerFactory', '$scope', 'pagingParams', 'EstadoSenalizacionV', 'inspeccionSenalizacionVs'];

    function EstadoSenalizacionVController (EstadosListControllerFactory, $scope, pagingParams, EstadoSenalizacionV, inspeccionSenalizacionVs) {
        var EstadosListController=EstadosListControllerFactory.create($scope, pagingParams, EstadoSenalizacionV, inspeccionSenalizacionVs);
        var controller=new EstadosListController({
            title:"Estados de señalizaciones verticales",
            entityName:"estado-senalizacion-v",
            parentEntityType:"inspeccion-senalizacion-v",
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
                            stateParams:{id_estado_senalizacion_v:item.id},
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
