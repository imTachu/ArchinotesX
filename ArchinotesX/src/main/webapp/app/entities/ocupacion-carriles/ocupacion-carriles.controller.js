(function() {
    'use strict';

    angular
        .module('siccApp')
        .controller('OcupacionCarrilesController', OcupacionCarrilesController);

    OcupacionCarrilesController.$inject = ['$filter', 'EntityListControllerFactory', '$scope', 'pagingParams', 'OcupacionCarriles'];

    function OcupacionCarrilesController ($filter, EntityListControllerFactory, $scope, pagingParams, OcupacionCarriles) {
        var EntityListController=EntityListControllerFactory.create($scope, pagingParams, OcupacionCarriles, $filter);
        var controller=new EntityListController({
            title:"Ocupaciones de carriles",
            entityName:"ocupacion-carriles",
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
                            sortBy:'fecha', 
                            label:"Fecha", 
                            value:function(item){
                                return $filter('date')(item.fecha, 'medium');
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
