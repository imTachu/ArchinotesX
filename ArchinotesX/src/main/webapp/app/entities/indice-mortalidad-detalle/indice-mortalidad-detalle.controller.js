(function() {
    'use strict';

    angular
        .module('archinotesxApp')
        .controller('IndiceMortalidadDetalleController', IndiceMortalidadDetalleController);

    IndiceMortalidadDetalleController.$inject = ['$filter', 'ListWithParentControllerFactory', '$scope', 'pagingParams', 'IndiceMortalidadDetalle', 'indiceMortalidad'];

    function IndiceMortalidadDetalleController ($filter, ListWithParentControllerFactory, $scope, pagingParams, IndiceMortalidadDetalle, indiceMortalidad) {
        var ListWithParentController=ListWithParentControllerFactory.create($scope, pagingParams, IndiceMortalidadDetalle, indiceMortalidad);
        var controller=new ListWithParentController({
            title:"Detalles de índice de mortalidad",
            listItemCreateBtnLabel:"Registrar nuevo detalle",
            entityName:"indice-mortalidad-detalle",
            parentEntityType:"indice-mortalidad",
            parentFilterParamName:"idIndiceMortalidad",
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
                            sortBy:'unidadFuncional', 
                            label:"Unidad Funcional", 
                            value:function(item){
                                return item.unidadFuncional;
                            }
                        },
                        {
                            sortBy:'kilometroInicial', 
                            label:"Km Inicial", 
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
                            label:"Km Final", 
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
                            stateParams:{id_detalle:item.id}
                        };   
                    }
                };
            }
        });
        
        return controller;
    }
})();
