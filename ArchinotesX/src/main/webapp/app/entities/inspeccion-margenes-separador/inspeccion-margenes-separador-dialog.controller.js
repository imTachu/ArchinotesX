(function() {
    'use strict';

    angular
        .module('siccApp')
        .controller('InspeccionMargenesSeparadorDialogController', InspeccionMargenesSeparadorDialogController);
    InspeccionMargenesSeparadorDialogController.$inject = ['DialogInspeccionControllerFactory', '$scope', 'entity', 'InspeccionMargenesSeparador'];

    function InspeccionMargenesSeparadorDialogController (DialogInspeccionControllerFactory, $scope, entity, InspeccionMargenesSeparador) {
        var DialogInspeccionController=DialogInspeccionControllerFactory.create($scope, InspeccionMargenesSeparador, entity);
        var controller=new DialogInspeccionController({
            entityName:"inspeccion-margenes-separador",
            withFinalizeState:true,
            withBackButton:true,
            tramoFieldName:'tramoDeInspeccion'
        });
        return controller;
    }
})();
