(function() {
    'use strict';

    angular
        .module('archinotesxApp')
        .controller('ColaPeajeDetalleController', ColaPeajeDetalleController);

    ColaPeajeDetalleController.$inject = ['$filter', 'ListWithParentControllerFactory', '$scope', 'pagingParams', 'ColaPeajeDetalle', 'colaPeaje'];

    function ColaPeajeDetalleController ($filter, ListWithParentControllerFactory, $scope, pagingParams, ColaPeajeDetalle, colaPeaje) {
        var ListWithParentController=ListWithParentControllerFactory.create($scope, pagingParams, ColaPeajeDetalle, colaPeaje);
        var controller=new ListWithParentController({
            title:"Detalles de cola de peaje",
            listItemCreateBtnLabel:"Registrar nuevo detalle",
            entityName:"cola-peaje-detalle",
            parentEntityType:"cola-peaje",
            parentFilterParamName:"idColaPeaje",
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
                            sortBy:'numeroCarril', 
                            label:"Número Carril", 
                            value:function(item){
                                return item.numeroCarril;
                            }
                        },
                        {
                            sortBy:'fechaInicial', 
                            label:"Fecha Inicial", 
                            value:function(item){
                                return $filter('date')(item.fechaInicial, 'medium');
                            }
                        },
                        {
                            sortBy:'cantidadVehiculosInicial', 
                            label:"Vehículos Inicial", 
                            value:function(item){
                                return item.cantidadVehiculosInicial;
                            }
                        },
                        {
                            sortBy:'fechaFinal', 
                            label:"Fecha Final", 
                            value:function(item){
                                return $filter('date')(item.fechaFinal, 'medium');
                            }
                        },
                        {
                            sortBy:'cantidadVehiculosFinal', 
                            label:"Vehículos Final", 
                            value:function(item){
                                return item.cantidadVehiculosFinal;
                            }
                        }
                    ],
                    editLink:function(item){
                        return{
                            state:controller.getOptions().entityName+'.edit',
                            stateParams:{id_detalle:item.id}
                        };   
                    }
                };
            }
        });
        
        return controller;
    }
})();
