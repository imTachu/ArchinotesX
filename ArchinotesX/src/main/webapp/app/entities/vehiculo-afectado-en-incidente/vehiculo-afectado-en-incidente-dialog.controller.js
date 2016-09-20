(function() {
    'use strict';

    angular
        .module('siccApp')
        .controller('VehiculoAfectadoEnIncidenteDialogController', VehiculoAfectadoEnIncidenteDialogController);

    VehiculoAfectadoEnIncidenteDialogController.$inject = ['DialogOperationInfoEntityControllerFactory', '$scope', 'entity', 'VehiculoAfectadoEnIncidente', 'incidente', 'TipoVehiculoAfectado', 'DateUtils'];

    function VehiculoAfectadoEnIncidenteDialogController (DialogOperationInfoEntityControllerFactory, $scope, entity, VehiculoAfectadoEnIncidente, incidente, TipoVehiculoAfectado, DateUtils) {
        var DialogOperationInfoEntityController=DialogOperationInfoEntityControllerFactory.create($scope, VehiculoAfectadoEnIncidente, entity, incidente);
        DialogOperationInfoEntityController.prototype=angular.extend(DialogOperationInfoEntityController.prototype,{
            postConstructor:function(){
                var vm=this;
                vm.tipovehiculoafectados = TipoVehiculoAfectado.query();
            },
            beforeSave:function(){
                //var vm=this;
                entity.vehiculoAfectadoDeIncidente = incidente;
            }
        });

        
        var controller=new DialogOperationInfoEntityController({
            entityName:"vehiculo-afectado-en-incidente",
            withFinalizeState:false,
            withBackButton:true
        });
        return controller;
    }
})();
