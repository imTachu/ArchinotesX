(function() {
    'use strict';

    angular
        .module('siccApp')
        .controller('VehiculoDeApoyoIncidenteDialogController', VehiculoDeApoyoIncidenteDialogController);

    VehiculoDeApoyoIncidenteDialogController.$inject = ['DialogOperationInfoEntityControllerFactory', '$scope', 'entity', 'VehiculoDeApoyoIncidente', 'incidente', 'TipoVehiculoApoyo', 'DateUtils'];

    function VehiculoDeApoyoIncidenteDialogController (DialogOperationInfoEntityControllerFactory, $scope, entity, VehiculoDeApoyoIncidente, incidente, TipoVehiculoApoyo, DateUtils) {
        var DialogOperationInfoEntityController=DialogOperationInfoEntityControllerFactory.create($scope, VehiculoDeApoyoIncidente, entity, incidente);
        DialogOperationInfoEntityController.prototype=angular.extend(DialogOperationInfoEntityController.prototype,{
            postConstructor:function(){
                var vm=this;
                vm.tipovehiculoapoyos = TipoVehiculoApoyo.query();
            },
            beforeSave:function(){
                //var vm=this;
                entity.vehiculoDeApoyoEnIncidente = incidente;
            },
            initDatePickerFields:function(){
                var vm=this;
                vm.datePickerOpenStatus = {};
                vm.datePickerOpenStatus.fechaSolicitudServicio = false;
                vm.datePickerOpenStatus.fechaInicioServicio = false;
                vm.datePickerOpenStatus.fechaFinServicio = false;
            }
        });

        
        var controller=new DialogOperationInfoEntityController({
            entityName:"vehiculo-de-apoyo-incidente",
            withFinalizeState:false,
            withBackButton:true
        });
        return controller;
    }
})();
