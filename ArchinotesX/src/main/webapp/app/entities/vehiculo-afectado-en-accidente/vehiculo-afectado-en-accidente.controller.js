(function() {
    'use strict';

    angular
        .module('archinotesxApp')
        .controller('VehiculoAfectadoEnAccidenteController', VehiculoAfectadoEnAccidenteController);

    VehiculoAfectadoEnAccidenteController.$inject = ['ListWithParentControllerFactory', '$scope', 'pagingParams', 'VehiculoAfectadoEnAccidente', 'accidente'];

    function VehiculoAfectadoEnAccidenteController (ListWithParentControllerFactory, $scope, pagingParams, VehiculoAfectadoEnAccidente, accidente) {
        var ListWithParentController=ListWithParentControllerFactory.create($scope, pagingParams, VehiculoAfectadoEnAccidente, accidente);
        var controller=new ListWithParentController({
            title:"Vehiculos afectados En Accidentes",
            listItemCreateBtnLabel:"Registrar vehículo afectado",
            entityName:"vehiculo-afectado-en-accidente",
            parentEntityType:"accidente",
            parentFilterParamName:"idAccidente",
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
                                return item.placasVehiculoAccidente;
                            }
                        },
                        {
                            label:"Nombre del conductor", 
                            value:function(item){
                                return item.nombreConductorVehiculoAccidente;
                            }
                        },
                        {
                            label:"Teléfono del conductor", 
                            value:function(item){
                                return item.telefonoConductorVehiculoAccidente;
                            }
                        },
                        {
                            label:"Tipo de vehículo", 
                            value:function(item){
                                return item.vehiculoAfectadoEnAccidente && item.vehiculoAfectadoEnAccidente.tipoVehiculo;
                            }
                        },
                        {
                            label:"Accidente relacionado", 
                            value:function(item){
                                return item.vehiculoAfectadoDeAccidente && item.vehiculoAfectadoDeAccidente.id;
                            }
                        }
                    ],
                    editLink:function(item){
                        return{
                            state:controller.getOptions().entityName+'.edit',
                            stateParams:{id_vehiculo_afectado:item.id}
                        };   
                    }
                };
            }
        });
        
        return controller;
    }
})();
