(function() {
    'use strict';

    angular
        .module('archinotesxApp')
        .controller('ArchivoInspeccionSenalizacionVController', ArchivoInspeccionSenalizacionVController);

    ArchivoInspeccionSenalizacionVController.$inject = ['ArchivosListControllerFactory', '$scope', 'pagingParams', 'ArchivoInspeccionSenalizacionV', 'estadoSenalizacionV', 'archivosListListener', 'inspeccionEntity'];

    function ArchivoInspeccionSenalizacionVController (ArchivosListControllerFactory, $scope, pagingParams, ArchivoInspeccionSenalizacionV, estadoSenalizacionV, archivosListListener, inspeccionEntity) {

        var ArchivosListController=ArchivosListControllerFactory.create($scope, pagingParams, ArchivoInspeccionSenalizacionV, estadoSenalizacionV, archivosListListener, inspeccionEntity);
        var controller=new ArchivosListController({
            entityName:"archivo-inspeccion-senalizacion-v",
            parentEntityType:"estado-senalizacion-v",
            parentFilterParamName:"idEstado"
            
        });
        return controller;
    }
})();
