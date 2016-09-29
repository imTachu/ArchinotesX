(function() {
    'use strict';

    angular
        .module('archinotesxApp')
        .controller('InspeccionBarreraContencionController', InspeccionBarreraContencionController);

    InspeccionBarreraContencionController.$inject = ['$filter', 'EntityListControllerFactory', '$scope', 'pagingParams', 'InspeccionBarreraContencion'];

    function InspeccionBarreraContencionController ($filter, EntityListControllerFactory, $scope, pagingParams, InspeccionBarreraContencion) {
        var EntityListController=EntityListControllerFactory.create($scope, pagingParams, InspeccionBarreraContencion);
        var controller=new EntityListController({
            title:"Inspecciones de barreras de contención",
            entityName:"inspeccion-barrera-contencion",
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
                            sortBy:'tramoDeInspeccionBarrrera.nombreTramo', 
                            label:"Tramo de inspección", 
                            value:function(item){
                                return item.tramoDeInspeccionBarrrera && item.tramoDeInspeccionBarrrera.nombreTramo;
                            },
                            linkToState:function(item){
                                return{
                                    state:'tramo-detail',
                                    stateParams:{id:item.tramoDeInspeccionBarrrera.id}
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
