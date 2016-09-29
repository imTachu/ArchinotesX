(function() {
    'use strict';

    angular
        .module('archinotesxApp')
        .controller('InspeccionDrenajesDialogController', InspeccionDrenajesDialogController);

    InspeccionDrenajesDialogController.$inject = ['DialogInspeccionControllerFactory', '$scope', 'entity', 'InspeccionDrenajes'];

    function InspeccionDrenajesDialogController (DialogInspeccionControllerFactory, $scope, entity, InspeccionDrenajes) {
        var DialogInspeccionController=DialogInspeccionControllerFactory.create($scope, InspeccionDrenajes, entity);
        var controller=new DialogInspeccionController({
            entityName:"inspeccion-drenajes",
            withFinalizeState:true,
            withBackButton:true,
            tramoFieldName:'tramoDeInspeccionDrenajes'
        });
        return controller;
    }
})();
