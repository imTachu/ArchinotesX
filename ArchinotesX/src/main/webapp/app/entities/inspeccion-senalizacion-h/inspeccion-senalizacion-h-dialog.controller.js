(function() {
    'use strict';

    angular
        .module('archinotesxApp')
        .controller('InspeccionSenalizacionHDialogController', InspeccionSenalizacionHDialogController);
    InspeccionSenalizacionHDialogController.$inject = ['DialogInspeccionControllerFactory', '$scope', 'entity', 'InspeccionSenalizacionH'];

    function InspeccionSenalizacionHDialogController (DialogInspeccionControllerFactory, $scope, entity, InspeccionSenalizacionH) {
        var DialogInspeccionController=DialogInspeccionControllerFactory.create($scope, InspeccionSenalizacionH, entity);
        var controller=new DialogInspeccionController({
            entityName:"inspeccion-senalizacion-h",
            withFinalizeState:true,
            withBackButton:true,
            tramoFieldName:'tramoDeInspeccionSenalizacion'
        });
        return controller;
    }
})();
