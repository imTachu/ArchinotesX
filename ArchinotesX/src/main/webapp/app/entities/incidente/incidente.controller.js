(function() {
    'use strict';

    angular
        .module('archinotesxApp')
        .controller('IncidenteController', IncidenteController);

    IncidenteController.$inject = ['$filter', 'EntityListControllerFactory', '$scope', 'pagingParams', 'Incidente'];

    function IncidenteController ($filter, EntityListControllerFactory, $scope, pagingParams, Incidente) {
        var EntityListController=EntityListControllerFactory.create($scope, pagingParams, Incidente);
        var controller=new EntityListController({
            title:"Incidentes",
            entityName:"incidente",
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
                            sortBy:'fechaRecepcionLlamada', 
                            label:"Hora de recepción de llamada", 
                            value:function(item){
                                return $filter('date')(item.fechaRecepcionLlamada, 'medium');
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
                            sortBy:'causaDeIncidente.causaIncidente', 
                            label:"Posible causa", 
                            value:function(item){
                                return item.causaDeIncidente  && item.causaDeIncidente.causaIncidente;
                            }
                        },
                        {
                            sortBy:'tipoDeIncidente.tipoIncidente', 
                            label:"Tipo de incidente", 
                            value:function(item){
                                return item.tipoDeIncidente && item.tipoDeIncidente.tipoIncidente;
                            }
                        },
                        {
                            sortBy:'tramoDeIncidente.nombreTramo', 
                            label:"Tramo", 
                            value:function(item){
                                return item.tramoDeIncidente && item.tramoDeIncidente.nombreTramo;
                            },
                            linkToState:function(item){
                                return{
                                    state:'tramo-detail',
                                    stateParams:{id:item.tramoDeIncidente.id}
                                };   
                            }
                        }
                    ],
                    detailLink:function(item){
                        return{
                            state:'incidente-detail',
                            stateParams:{id:item.id},
                            roles:'ROLE_SUPERVISOR'
                        };   
                    },
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
