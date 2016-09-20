(function() {
    'use strict';

    angular
        .module('siccApp')
        .controller('InspeccionBachesDialogController', InspeccionBachesDialogController);
    InspeccionBachesDialogController.$inject = ['DialogInspeccionControllerFactory', '$scope', 'entity', 'InspeccionBaches'];

    function InspeccionBachesDialogController (DialogInspeccionControllerFactory, $scope, entity, InspeccionBaches) {
        var DialogInspeccionController=DialogInspeccionControllerFactory.create($scope, InspeccionBaches, entity);
        var controller=new DialogInspeccionController({
            entityName:"inspeccion-baches",
            withFinalizeState:true,
            withBackButton:true,
            tramoFieldName:'tramoDeInspeccionBaches'
        });
        return controller;
    }
})();
