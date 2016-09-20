(function() {
    'use strict';

    angular
        .module('siccApp')
        .controller('EstadoBachesController', EstadoBachesController);

    EstadoBachesController.$inject = ['EstadosListControllerFactory', '$scope', 'pagingParams', 'EstadoBaches', 'inspeccionBaches'];

    function EstadoBachesController (EstadosListControllerFactory, $scope, pagingParams, EstadoBaches, inspeccionBaches) {
        var EstadosListController=EstadosListControllerFactory.create($scope, pagingParams, EstadoBaches, inspeccionBaches);
        var controller=new EstadosListController({
            title:"Estados de baches",
            entityName:"estado-baches",
            parentEntityType:"inspeccion-baches",
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
                            sortBy:'costado', 
                            label:"Costado", 
                            value:function(item){
                                return item.costado;
                            }
                        }
                    ],
                    editLink:function(item){
                        return{
                            state:controller.getOptions().entityName+'.edit',
                            stateParams:{id_estado_baches:item.id},
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
