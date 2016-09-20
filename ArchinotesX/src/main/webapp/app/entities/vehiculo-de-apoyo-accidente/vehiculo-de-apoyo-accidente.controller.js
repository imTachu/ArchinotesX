(function() {
    'use strict';

    angular
        .module('siccApp')
        .controller('VehiculoDeApoyoAccidenteController', VehiculoDeApoyoAccidenteController);

    VehiculoDeApoyoAccidenteController.$inject = ['$filter', 'ListWithParentControllerFactory', '$scope', 'pagingParams', 'VehiculoDeApoyoAccidente', 'accidente'];

    function VehiculoDeApoyoAccidenteController ($filter, ListWithParentControllerFactory, $scope, pagingParams, VehiculoDeApoyoAccidente, accidente) {
        var ListWithParentController=ListWithParentControllerFactory.create($scope, pagingParams, VehiculoDeApoyoAccidente, accidente);
        var controller=new ListWithParentController({
            title:"Vehículos de apoyo",
            listItemCreateBtnLabel:"Registrar vehículo de apoyo",
            entityName:"vehiculo-de-apoyo-accidente",
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
