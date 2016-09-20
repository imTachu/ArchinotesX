(function() {
    'use strict';

    angular
        .module('siccApp')
        .controller('ArchivoMargenesSeparadorController', ArchivoMargenesSeparadorController);

    ArchivoMargenesSeparadorController.$inject = ['ArchivosListControllerFactory', '$scope', 'pagingParams', 'ArchivoMargenesSeparador', 'estadoMargenes', 'archivosListListener', 'inspeccionEntity'];

    function ArchivoMargenesSeparadorController (ArchivosListControllerFactory, $scope, pagingParams, ArchivoMargenesSeparador, estadoMargenes, archivosListListener, inspeccionEntity) {

        var ArchivosListController=ArchivosListControllerFactory.create($scope, pagingParams, ArchivoMargenesSeparador, estadoMargenes, archivosListListener, inspeccionEntity);
        var controller=new ArchivosListController({
            entityName:"archivo-margenes-separador",
            parentEntityType:"estado-margenes-separador",
            parentFilterParamName:"idEstado"
            
        });
        //TODO cambiar los setters a pasar opciones
        return controller;
    }
})();
