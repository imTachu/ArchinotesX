(function() {
    'use strict';

    angular
        .module('siccApp')
        .controller('InspeccionDrenajesController', InspeccionDrenajesController);

    InspeccionDrenajesController.$inject = ['$filter', 'EntityListControllerFactory', '$scope', 'pagingParams', 'InspeccionDrenajes'];

    function InspeccionDrenajesController ($filter, EntityListControllerFactory, $scope, pagingParams, InspeccionDrenajes) {
        var EntityListController=EntityListControllerFactory.create($scope, pagingParams, InspeccionDrenajes);
        var controller=new EntityListController({
            title:"Inspecciones de drenajes",
            entityName:"inspeccion-drenajes",
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
                            sortBy:'tramoDeInspeccionDrenajes.nombreTramo', 
                            label:"Tramo de inspección", 
                            value:function(item){
                                return item.tramoDeInspeccionDrenajes && item.tramoDeInspeccionDrenajes.nombreTramo;
                            },
                            linkToState:function(item){
                                return{
                                    state:'tramo-detail',
                                    stateParams:{id:item.tramoDeInspeccionDrenajes.id}
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
