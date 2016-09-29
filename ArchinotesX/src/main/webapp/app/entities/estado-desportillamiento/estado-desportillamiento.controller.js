(function() {
    'use strict';

    angular
        .module('archinotesxApp')
        .controller('EstadoDesportillamientoController', EstadoDesportillamientoController);

    EstadoDesportillamientoController.$inject = ['EstadosListControllerFactory', '$scope', 'pagingParams', 'EstadoDesportillamiento', 'inspeccionDesportillamientos'];

    function EstadoDesportillamientoController (EstadosListControllerFactory, $scope, pagingParams, EstadoDesportillamiento, inspeccionDesportillamientos) {
        var EstadosListController=EstadosListControllerFactory.create($scope, pagingParams, EstadoDesportillamiento, inspeccionDesportillamientos);
        var controller=new EstadosListController({
            title:"Estados de desportillamientos",
            entityName:"estado-desportillamiento",
            parentEntityType:"inspeccion-desportillamiento",
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
                            sortBy:'costadoInspeccion', 
                            label:"Costado Inspección", 
                            value:function(item){
                                return item.costadoInspeccion;
                            }
                        }
                    ],
                    editLink:function(item){
                        return{
                            state:controller.getOptions().entityName+'.edit',
                            stateParams:{id_estado_desportillamiento:item.id},
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
