(function() {
    'use strict';

    angular
        .module('archinotesxApp')
        .controller('VehiculoDeApoyoIncidenteController', VehiculoDeApoyoIncidenteController);

    VehiculoDeApoyoIncidenteController.$inject = ['$filter', 'ListWithParentControllerFactory', '$scope', 'pagingParams', 'VehiculoDeApoyoIncidente', 'incidente'];

    function VehiculoDeApoyoIncidenteController ($filter, ListWithParentControllerFactory, $scope, pagingParams, VehiculoDeApoyoIncidente, incidente) {
        var ListWithParentController=ListWithParentControllerFactory.create($scope, pagingParams, VehiculoDeApoyoIncidente, incidente);
        var controller=new ListWithParentController({
            title:"Vehículos de apoyo",
            listItemCreateBtnLabel:"Registrar vehículo de apoyo",
            entityName:"vehiculo-de-apoyo-incidente",
            parentEntityType:"incidente",
            parentFilterParamName:"idIncidente",
            sortable:false,
            getColumnsConfig:function(controller){
                return {
                    fields:[
                        {
                            label:"ID", 
                            value:function(item){
                                return item.id;
                            }
                        },
                        {
                            label:"Hora de solicitud", 
                            value:function(item){
                                return $filter('date')(item.fechaSolicitudServicio, 'medium');
                            }
                        },
                        {
                            label:"Hora de inicio de servicio", 
                            value:function(item){
                                return $filter('date')(item.fechaInicioServicio, 'medium');
                            }
                        },
                        {
                            label:"Hora de fin de servicio", 
                            value:function(item){
                                return $filter('date')(item.fechaFinServicio, 'medium');
                            }
                        },
                        {
                            label:"Tipo de vehículo", 
                            value:function(item){
                                return item.tipoVehiculoDeApoyo && item.tipoVehiculoDeApoyo.tipoVehiculo;
                            }
                        }
                    ],
                    editLink:function(item){
                        return{
                            state:controller.getOptions().entityName+'.edit',
                            stateParams:{id_vehiculo_apoyo:item.id}
                        };   
                    }
                };
            }
        });
        
        return controller;
    }
})();
