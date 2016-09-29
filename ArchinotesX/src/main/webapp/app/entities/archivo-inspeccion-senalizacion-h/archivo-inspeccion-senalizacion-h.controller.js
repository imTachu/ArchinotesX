(function() {
    'use strict';

    angular
        .module('archinotesxApp')
        .controller('ArchivoInspeccionSenalizacionHController', ArchivoInspeccionSenalizacionHController);

    ArchivoInspeccionSenalizacionHController.$inject = ['ArchivosListControllerFactory', '$scope', 'pagingParams', 'ArchivoInspeccionSenalizacionH', 'estadoSenalizacionH', 'archivosListListener', 'inspeccionEntity'];

    function ArchivoInspeccionSenalizacionHController (ArchivosListControllerFactory, $scope, pagingParams, ArchivoInspeccionSenalizacionH, estadoSenalizacionH, archivosListListener, inspeccionEntity) {

        var ArchivosListController=ArchivosListControllerFactory.create($scope, pagingParams, ArchivoInspeccionSenalizacionH, estadoSenalizacionH, archivosListListener, inspeccionEntity);
        var controller=new ArchivosListController({
            entityName:"archivo-inspeccion-senalizacion-h",
            parentEntityType:"estado-senalizacion-h",
            parentFilterParamName:"idEstado"
            
        });
        return controller;
    }
})();
