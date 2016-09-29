(function() {
    'use strict';

    angular
        .module('archinotesxApp')
        .controller('VehiculoDeApoyoAccidenteDialogController', VehiculoDeApoyoAccidenteDialogController);

    VehiculoDeApoyoAccidenteDialogController.$inject = ['DialogOperationInfoEntityControllerFactory', '$scope', 'entity', 'VehiculoDeApoyoAccidente', 'accidente', 'TipoVehiculoApoyo', 'DateUtils'];

    function VehiculoDeApoyoAccidenteDialogController (DialogOperationInfoEntityControllerFactory, $scope, entity, VehiculoDeApoyoAccidente, accidente, TipoVehiculoApoyo, DateUtils) {
        var DialogOperationInfoEntityController=DialogOperationInfoEntityControllerFactory.create($scope, VehiculoDeApoyoAccidente, entity, accidente);
        DialogOperationInfoEntityController.prototype=angular.extend(DialogOperationInfoEntityController.prototype,{
            postConstructor:function(){
                var vm=this;
                vm.tipovehiculoapoyos = TipoVehiculoApoyo.query();
            },
            beforeSave:function(){
                //var vm=this;
                entity.vehiculoDeApoyoEnAccidente = accidente;
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
            entityName:"vehiculo-de-apoyo-accidente",
            withFinalizeState:false,
            withBackButton:true
        });
        return controller;
    }
})();
