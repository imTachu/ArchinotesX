(function() {
    'use strict';

    angular
        .module('archinotesxApp')
        .controller('IndiceMortalidadController', IndiceMortalidadController);

    IndiceMortalidadController.$inject = ['$filter', 'EntityListControllerFactory', '$scope', 'pagingParams', 'IndiceMortalidad'];

    function IndiceMortalidadController ($filter, EntityListControllerFactory, $scope, pagingParams, IndiceMortalidad) {
        var EntityListController=EntityListControllerFactory.create($scope, pagingParams, IndiceMortalidad);
        var controller=new EntityListController({
            title:"Índices de mortalidad",
            entityName:"indice-mortalidad",
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
                            sortBy:'fechaInicial', 
                            label:"Fecha Inicial", 
                            value:function(item){
                                return $filter('date')(item.fechaInicial, 'medium');
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
                            sortBy:'cantidadTrafico', 
                            label:"Cantidad Trafico", 
                            value:function(item){
                                return item.cantidadTrafico;
                            }
                        },
                        {
                            sortBy:'numeroVictimasFatales', 
                            label:"No. Víctimas", 
                            value:function(item){
                                return item.numeroVictimasFatales;
                            }
                        },
                        {
                            sortBy:'indiceMortalidad', 
                            label:"Índice", 
                            value:function(item){
                                return item.indiceMortalidad;
                            }
                        }
                    ],
                    editLink:function(item){
                        return{
                            state:controller.getOptions().entityName+'.edit',
                            stateParams:{id:item.id},
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
