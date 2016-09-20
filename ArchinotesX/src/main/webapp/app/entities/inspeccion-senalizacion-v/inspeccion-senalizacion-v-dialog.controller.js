(function() {
    'use strict';

    angular
        .module('siccApp')
        .controller('InspeccionSenalizacionVDialogController', InspeccionSenalizacionVDialogController);
    InspeccionSenalizacionVDialogController.$inject = ['DialogInspeccionControllerFactory', '$scope', 'entity', 'InspeccionSenalizacionV'];

    function InspeccionSenalizacionVDialogController (DialogInspeccionControllerFactory, $scope, entity, InspeccionSenalizacionV) {
        var DialogInspeccionController=DialogInspeccionControllerFactory.create($scope, InspeccionSenalizacionV, entity);
        var controller=new DialogInspeccionController({
            entityName:"inspeccion-senalizacion-v",
            withFinalizeState:true,
            withBackButton:true,
            tramoFieldName:'tramoDeInspeccionSenalizacion'
        });
        return controller;
    }
})();
