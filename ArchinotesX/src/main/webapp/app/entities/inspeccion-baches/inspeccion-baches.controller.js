(function() {
    'use strict';

    angular
        .module('siccApp')
        .controller('InspeccionBachesController', InspeccionBachesController);

    InspeccionBachesController.$inject = ['$filter', 'EntityListControllerFactory', '$scope', 'pagingParams', 'InspeccionBaches'];

    function InspeccionBachesController ($filter, EntityListControllerFactory, $scope, pagingParams, InspeccionBaches) {
        var EntityListController=EntityListControllerFactory.create($scope, pagingParams, InspeccionBaches);
        var controller=new EntityListController({
            title:"Inspecciones de baches",
            entityName:"inspeccion-baches",
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
                            sortBy:'tramoDeInspeccionBaches.nombreTramo', 
                            label:"Tramo de inspección", 
                            value:function(item){
                                return item.tramoDeInspeccionBaches && item.tramoDeInspeccionBaches.nombreTramo;
                            },
                            linkToState:function(item){
                                return{
                                    state:'tramo-detail',
                                    stateParams:{id:item.tramoDeInspeccionBaches.id}
                                };   
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
                            sortBy:'fechaInspeccion', 
                            label:"Fecha de inspección", 
                            value:function(item){
                                return $filter('date')(item.fechaInspeccion, 'medium');
                            }
                        },
                        {
                            sortBy:'fechaVerificacion', 
                            label:"Fecha de verificación", 
                            value:function(item){
                                return $filter('date')(item.fechaVerificacion, 'medium');
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
