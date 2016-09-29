(function() {
    'use strict';

    angular
        .module('archinotesxApp')
        .controller('VehiculoAfectadoEnIncidenteController', VehiculoAfectadoEnIncidenteController);

    VehiculoAfectadoEnIncidenteController.$inject = ['ListWithParentControllerFactory', '$scope', 'pagingParams', 'VehiculoAfectadoEnIncidente', 'incidente'];

    function VehiculoAfectadoEnIncidenteController (ListWithParentControllerFactory, $scope, pagingParams, VehiculoAfectadoEnIncidente, incidente) {
        var ListWithParentController=ListWithParentControllerFactory.create($scope, pagingParams, VehiculoAfectadoEnIncidente, incidente);
        var controller=new ListWithParentController({
            title:"Vehículos afectados",
            listItemCreateBtnLabel:"Registrar vehículo afectado",
            entityName:"vehiculo-afectado-en-incidente",
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
                            label:"Placas del vehículo", 
                            value:function(item){
                                return item.placasVehiculoIncidente;
                            }
                        },
                        {
                            label:"Nombre del conductor", 
                            value:function(item){
                                return item.nombreConductorVehiculoIncidente;
                            }
                        },
                        {
                            label:"Teléfono del conductor", 
                            value:function(item){
                                return item.telefonoConductorVehiculoIncidente;
                            }
                        },
                        {
                            label:"Tipo de vehículo", 
                            value:function(item){
                                return item.vehiculoAfectadoEnIncidente && item.vehiculoAfectadoEnIncidente.tipoVehiculo;
                            }
                        },
                        {
                            label:"Incidente relacionado", 
                            value:function(item){
                                return item.vehiculoAfectadoDeIncidente && item.vehiculoAfectadoDeIncidente.id;
                            }
                        }
                    ],
                    editLink:function(item){
                        return{
                            state:controller.getOptions().entityName+'.edit',
                            stateParams:{id_vehiculo:item.id}
                        };   
                    }
                };
            }
        });
        
        return controller;
    }
})();
