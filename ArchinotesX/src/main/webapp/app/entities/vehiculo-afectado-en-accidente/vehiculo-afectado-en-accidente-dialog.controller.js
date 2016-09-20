(function() {
    'use strict';

    angular
        .module('siccApp')
        .controller('VehiculoAfectadoEnAccidenteDialogController', VehiculoAfectadoEnAccidenteDialogController);

    VehiculoAfectadoEnAccidenteDialogController.$inject = ['DialogOperationInfoEntityControllerFactory', '$scope', 'entity', 'VehiculoAfectadoEnAccidente', 'accidente', 'TipoVehiculoAfectado', 'DateUtils'];

    function VehiculoAfectadoEnAccidenteDialogController (DialogOperationInfoEntityControllerFactory, $scope, entity, VehiculoAfectadoEnAccidente, accidente, TipoVehiculoAfectado, DateUtils) {
        var DialogOperationInfoEntityController=DialogOperationInfoEntityControllerFactory.create($scope, VehiculoAfectadoEnAccidente, entity, accidente);
        DialogOperationInfoEntityController.prototype=angular.extend(DialogOperationInfoEntityController.prototype,{
            postConstructor:function(){
                var vm=this;
                vm.tipovehiculoafectados = TipoVehiculoAfectado.query();
            },
            beforeSave:function(){
                //var vm=this;
                entity.vehiculoAfectadoDeAccidente = accidente;
            }
        });

        
        var controller=new DialogOperationInfoEntityController({
            entityName:"vehiculo-afectado-en-accidente",
            withFinalizeState:false,
            withBackButton:true
        });
        return controller;
    }
})();
