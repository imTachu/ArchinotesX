(function() {
    'use strict';

    angular
        .module('archinotesxApp')
        .controller('OcupacionCarrilesDetalleController', OcupacionCarrilesDetalleController);

    OcupacionCarrilesDetalleController.$inject = ['$filter', 'ListWithParentControllerFactory', '$scope', 'pagingParams', 'OcupacionCarrilesDetalle', 'ocupacionCarriles'];

    function OcupacionCarrilesDetalleController ($filter, ListWithParentControllerFactory, $scope, pagingParams, OcupacionCarrilesDetalle, ocupacionCarriles) {
        var ListWithParentController=ListWithParentControllerFactory.create($scope, pagingParams, OcupacionCarrilesDetalle, ocupacionCarriles);
        var controller=new ListWithParentController({
            title:"Detalles de ocupación de carriles",
            listItemCreateBtnLabel:"Registrar nuevo detalle",
            entityName:"ocupacion-carriles-detalle",
            parentEntityType:"ocupacion-carriles",
            parentFilterParamName:"idOcupacionCarriles",
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
                            sortBy:'fechaInicial', 
                            label:"Fecha Inicial", 
                            value:function(item){
                                return $filter('date')(item.fechaInicial, 'medium');
                            }
                        },
                        {
                            sortBy:'longitudColaInicial', 
                            label:"Longitud cola inicial", 
                            value:function(item){
                                return item.longitudColaInicial;
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
                            sortBy:'longitudColaFinal', 
                            label:"Longitud cola final", 
                            value:function(item){
                                return item.longitudColaFinal;
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
