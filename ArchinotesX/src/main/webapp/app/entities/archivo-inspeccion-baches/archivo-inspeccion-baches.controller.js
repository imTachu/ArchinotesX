(function() {
    'use strict';

    angular
        .module('archinotesxApp')
        .controller('ArchivoInspeccionBachesController', ArchivoInspeccionBachesController);

    ArchivoInspeccionBachesController.$inject = ['ArchivosListControllerFactory', '$scope', 'pagingParams', 'ArchivoInspeccionBaches', 'estadoBaches', 'archivosListListener', 'inspeccionEntity'];

    function ArchivoInspeccionBachesController (ArchivosListControllerFactory, $scope, pagingParams, ArchivoInspeccionBaches, estadoBaches, archivosListListener, inspeccionEntity) {

        var ArchivosListController=ArchivosListControllerFactory.create($scope, pagingParams, ArchivoInspeccionBaches, estadoBaches, archivosListListener, inspeccionEntity);
        var controller=new ArchivosListController({
            entityName:"archivo-inspeccion-baches",
            parentEntityType:"estado-baches",
            parentFilterParamName:"idEstado"
            
        });
        return controller;
    }
})();
