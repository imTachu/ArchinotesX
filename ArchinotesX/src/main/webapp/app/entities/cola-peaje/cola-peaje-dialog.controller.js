(function() {
    'use strict';

    angular
        .module('archinotesxApp')
        .controller('ColaPeajeDialogController', ColaPeajeDialogController);

    ColaPeajeDialogController.$inject = ['EntityDialogControllerFactory', '$scope', 'entity', 'ColaPeaje', 'Peaje', 'DateUtils'];

    function ColaPeajeDialogController (EntityDialogControllerFactory, $scope, entity, ColaPeaje, Peaje, DateUtils) {
        var EntityDialogController=EntityDialogControllerFactory.create($scope, ColaPeaje, entity);
        EntityDialogController.prototype=angular.extend(EntityDialogController.prototype,{

            postConstructor:function(){
                var vm=this;
                vm.peajes = Peaje.query();
            },
            initDatePickerFields:function(){
                var vm=this;
                vm.datePickerOpenStatus = {};
                vm.datePickerOpenStatus.fecha = false;
            }


        });

        
        var controller=new EntityDialogController({
            entityName:"cola-peaje",
            withFinalizeState:true
        });
        return controller;
    }
})();
