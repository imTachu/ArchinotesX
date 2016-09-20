(function() {
    'use strict';

    angular
        .module('siccApp')
        .controller('ColaPeajeController', ColaPeajeController);

    ColaPeajeController.$inject = ['$filter', 'EntityListControllerFactory', '$scope', 'pagingParams', 'ColaPeaje'];

    function ColaPeajeController ($filter, EntityListControllerFactory, $scope, pagingParams, ColaPeaje) {
        var EntityListController=EntityListControllerFactory.create($scope, pagingParams, ColaPeaje);
        var controller=new EntityListController({
            title:"Colas de Peajes",
            entityName:"cola-peaje",
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
                            sortBy:'carrilesActivos', 
                            label:"Carriles Activos", 
                            value:function(item){
                                return item.carrilesActivos;
                            }
                        },
                        {
                            sortBy:'peaje.nombrePeaje', 
                            label:"Peaje", 
                            value:function(item){
                                return item.peaje && item.peaje.nombrePeaje;
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
