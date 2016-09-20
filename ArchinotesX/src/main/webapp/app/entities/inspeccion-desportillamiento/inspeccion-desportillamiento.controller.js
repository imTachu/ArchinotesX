(function() {
    'use strict';

    angular
        .module('siccApp')
        .controller('InspeccionDesportillamientoController', InspeccionDesportillamientoController);

    InspeccionDesportillamientoController.$inject = ['$filter', 'EntityListControllerFactory', '$scope', 'pagingParams', 'InspeccionDesportillamiento'];

    function InspeccionDesportillamientoController ($filter, EntityListControllerFactory, $scope, pagingParams, InspeccionDesportillamiento) {
        var EntityListController=EntityListControllerFactory.create($scope, pagingParams, InspeccionDesportillamiento);
        var controller=new EntityListController({
            title:"Inspecciones de desportillamientos",
            entityName:"inspeccion-desportillamiento",
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
                            sortBy:'tramoDeDesportillamiento.nombreTramo', 
                            label:"Tramo de inspección", 
                            value:function(item){
                                return item.tramoDeDesportillamiento && item.tramoDeDesportillamiento.nombreTramo;
                            },
                            linkToState:function(item){
                                return{
                                    state:'tramo-detail',
                                    stateParams:{id:item.tramoDeDesportillamiento.id}
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
