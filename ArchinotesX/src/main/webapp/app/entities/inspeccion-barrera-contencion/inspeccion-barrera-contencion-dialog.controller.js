(function() {
    'use strict';

    angular
        .module('siccApp')
        .controller('InspeccionBarreraContencionDialogController', InspeccionBarreraContencionDialogController);
    InspeccionBarreraContencionDialogController.$inject = ['DialogInspeccionControllerFactory', '$scope', 'entity', 'InspeccionBarreraContencion'];

    function InspeccionBarreraContencionDialogController (DialogInspeccionControllerFactory, $scope, entity, InspeccionBarreraContencion) {
        var DialogInspeccionController=DialogInspeccionControllerFactory.create($scope, InspeccionBarreraContencion, entity);
        var controller=new DialogInspeccionController({
            entityName:"inspeccion-barrera-contencion",
            withFinalizeState:true,
            withBackButton:true,
            tramoFieldName:'tramoDeInspeccionBarrrera'
        });
        return controller;
    }
})();
