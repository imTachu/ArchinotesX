(function() {
    'use strict';

    angular
        .module('archinotesxApp')
        .controller('InspeccionDesportillamientoDialogController', InspeccionDesportillamientoDialogController);
    InspeccionDesportillamientoDialogController.$inject = ['DialogInspeccionControllerFactory', '$scope', 'entity', 'InspeccionDesportillamiento'];

    function InspeccionDesportillamientoDialogController (DialogInspeccionControllerFactory, $scope, entity, InspeccionDesportillamiento) {
        var DialogInspeccionController=DialogInspeccionControllerFactory.create($scope, InspeccionDesportillamiento, entity);
        var controller=new DialogInspeccionController({
            entityName:"inspeccion-desportillamiento",
            withFinalizeState:true,
            withBackButton:true,
            tramoFieldName:'tramoDeDesportillamiento'
        });
        return controller;
    }
})();
