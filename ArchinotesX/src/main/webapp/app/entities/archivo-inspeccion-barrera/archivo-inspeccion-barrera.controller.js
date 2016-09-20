(function() {
    'use strict';

    angular
        .module('siccApp')
        .controller('ArchivoInspeccionBarreraController', ArchivoInspeccionBarreraController);

    ArchivoInspeccionBarreraController.$inject = ['ArchivosListControllerFactory', '$scope', 'pagingParams', 'ArchivoInspeccionBarrera', 'estadoBarreraContencion', 'archivosListListener', 'inspeccionEntity'];

    function ArchivoInspeccionBarreraController (ArchivosListControllerFactory, $scope, pagingParams, ArchivoInspeccionBarrera, estadoBarreraContencion, archivosListListener, inspeccionEntity) {

        var ArchivosListController=ArchivosListControllerFactory.create($scope, pagingParams, ArchivoInspeccionBarrera, estadoBarreraContencion, archivosListListener, inspeccionEntity);
        var controller=new ArchivosListController({
            entityName:"archivo-inspeccion-barrera",
            parentEntityType:"estado-barrera-contencion",
            parentFilterParamName:"idEstado"
            
        });
        return controller;
    }
})();
