(function() {
    'use strict';

    angular
        .module('archinotesxApp')
        .controller('InspeccionSenalizacionHController', InspeccionSenalizacionHController);

    InspeccionSenalizacionHController.$inject = ['$filter', 'EntityListControllerFactory', '$scope', 'pagingParams', 'InspeccionSenalizacionH'];

    function InspeccionSenalizacionHController ($filter, EntityListControllerFactory, $scope, pagingParams, InspeccionSenalizacionH) {
        var EntityListController=EntityListControllerFactory.create($scope, pagingParams, InspeccionSenalizacionH);
        var controller=new EntityListController({
            title:"Inspecciones de señalizaciones horizontales",
            entityName:"inspeccion-senalizacion-h",
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
                            sortBy:'tramoDeInspeccionSenalizacion.nombreTramo', 
                            label:"Tramo de inspección", 
                            value:function(item){
                                return item.tramoDeInspeccionSenalizacion && item.tramoDeInspeccionSenalizacion.nombreTramo;
                            },
                            linkToState:function(item){
                                return{
                                    state:'tramo-detail',
                                    stateParams:{id:item.tramoDeInspeccionSenalizacion.id}
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
