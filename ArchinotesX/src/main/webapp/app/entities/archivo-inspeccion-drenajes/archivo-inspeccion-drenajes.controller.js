(function() {
    'use strict';

    angular
        .module('siccApp')
        .controller('ArchivoInspeccionDrenajesController', ArchivoInspeccionDrenajesController);

    ArchivoInspeccionDrenajesController.$inject = ['ArchivosListControllerFactory', '$scope', 'pagingParams', 'ArchivoInspeccionDrenajes', 'estadoDrenajes', 'archivosListListener', 'inspeccionEntity'];

    function ArchivoInspeccionDrenajesController (ArchivosListControllerFactory, $scope, pagingParams, ArchivoInspeccionDrenajes, estadoDrenajes, archivosListListener, inspeccionEntity) {

        var ArchivosListController=ArchivosListControllerFactory.create($scope, pagingParams, ArchivoInspeccionDrenajes, estadoDrenajes, archivosListListener, inspeccionEntity);
        var controller=new ArchivosListController({
            entityName:"archivo-inspeccion-drenajes",
            parentEntityType:"estado-drenajes",
            parentFilterParamName:"idEstado"
            
        });
        //TODO cambiar los setters a pasar opciones
        return controller;
    }
})();
