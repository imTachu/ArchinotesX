(function() {
    'use strict';

    angular
        .module('siccApp')
        .controller('InspeccionMargenesSeparadorController', InspeccionMargenesSeparadorController);

    InspeccionMargenesSeparadorController.$inject = ['$filter', 'EntityListControllerFactory', '$scope', 'pagingParams', 'InspeccionMargenesSeparador'];

    function InspeccionMargenesSeparadorController ($filter, EntityListControllerFactory, $scope, pagingParams, InspeccionMargenesSeparador) {
        var EntityListController=EntityListControllerFactory.create($scope, pagingParams, InspeccionMargenesSeparador);
        var controller=new EntityListController({
            title:"Inspecciones de márgenes de separador",
            entityName:"inspeccion-margenes-separador",
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
                            sortBy:'tramoDeInspeccion.nombreTramo', 
                            label:"Tramo de inspección", 
                            value:function(item){
                                return item.tramoDeInspeccion && item.tramoDeInspeccion.nombreTramo;
                            },
                            linkToState:function(item){
                                return{
                                    state:'tramo-detail',
                                    stateParams:{id:item.tramoDeInspeccion.id}
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
