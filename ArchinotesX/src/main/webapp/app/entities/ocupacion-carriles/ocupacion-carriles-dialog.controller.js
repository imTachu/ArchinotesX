(function() {
    'use strict';

    angular
        .module('siccApp')
        .controller('OcupacionCarrilesDialogController', OcupacionCarrilesDialogController);

    OcupacionCarrilesDialogController.$inject = ['EntityDialogControllerFactory', '$scope', 'entity', 'OcupacionCarriles', 'Tramo', 'DateUtils'];

    function OcupacionCarrilesDialogController (EntityDialogControllerFactory, $scope, entity, OcupacionCarriles, Tramo, DateUtils) {
        var EntityDialogController=EntityDialogControllerFactory.create($scope, OcupacionCarriles, entity);
        EntityDialogController.prototype=angular.extend(EntityDialogController.prototype,{

            postConstructor:function(){
                var vm=this;
                vm.unidadesFuncionales = Tramo.getAllUnidadesFuncionales();
            },
            initDatePickerFields:function(){
                var vm=this;
                vm.datePickerOpenStatus = {};
                vm.datePickerOpenStatus.fecha = false;
            }


        });

        
        var controller=new EntityDialogController({
            entityName:"ocupacion-carriles",
            withFinalizeState:true
        });
        return controller;
    }
})();
