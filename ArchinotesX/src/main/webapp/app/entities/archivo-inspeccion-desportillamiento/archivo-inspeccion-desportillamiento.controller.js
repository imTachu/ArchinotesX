(function() {
    'use strict';

    angular
        .module('archinotesxApp')
        .controller('ArchivoInspeccionDesportillamientoController', ArchivoInspeccionDesportillamientoController);

    ArchivoInspeccionDesportillamientoController.$inject = ['ArchivosListControllerFactory', '$scope', 'pagingParams', 'ArchivoInspeccionDesportillamiento', 'estadoDesportillamientos', 'archivosListListener', 'inspeccionEntity'];

    function ArchivoInspeccionDesportillamientoController (ArchivosListControllerFactory, $scope, pagingParams, ArchivoInspeccionDesportillamiento, estadoDesportillamientos, archivosListListener, inspeccionEntity) {

        var ArchivosListController=ArchivosListControllerFactory.create($scope, pagingParams, ArchivoInspeccionDesportillamiento, estadoDesportillamientos, archivosListListener, inspeccionEntity);
        var controller=new ArchivosListController({
            entityName:"archivo-inspeccion-desportillamiento",
            parentEntityType:"estado-desportillamiento",
            parentFilterParamName:"idEstado" 
        });
        return controller;
    }
})();
