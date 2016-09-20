(function() {
    'use strict';

    angular
        .module('siccApp')
        .controller('AccidenteController', AccidenteController);

    AccidenteController.$inject = ['$filter', 'EntityListControllerFactory', '$scope', 'pagingParams', 'Accidente'];

    function AccidenteController ($filter, EntityListControllerFactory, $scope, pagingParams, Accidente) {
        var EntityListController=EntityListControllerFactory.create($scope, pagingParams, Accidente);
        var controller=new EntityListController({
            title:"Accidentes",
            entityName:"accidente",
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
                            sortBy:'causaDeAccidente.causaAccidente', 
                            label:"Posible causa", 
                            value:function(item){
                                return item.causaDeAccidente && item.causaDeAccidente.causaAccidente;
                            }
                        },
                        {
                            sortBy:'tipoDeAccidente.tipoAccidente', 
                            label:"Tipo de accidente", 
                            value:function(item){
                                return item.tipoDeAccidente && item.tipoDeAccidente.tipoAccidente;
                            }
                        },
                        {
                            sortBy:'tramoDeAccidente.nombreTramo', 
                            label:"Tramo", 
                            value:function(item){
                                return item.tramoDeAccidente && item.tramoDeAccidente.nombreTramo;
                            },
                            linkToState:function(item){
                                return{
                                    state:'tramo-detail',
                                    stateParams:{id:item.tramoDeAccidente.id}
                                };   
                            }
                        }
                    ],
                    detailLink:function(item){
                        return{
                            state:'accidente-detail',
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
