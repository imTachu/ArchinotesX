(function() {
    'use strict';

    angular
        .module('archinotesxApp')
        .controller('ArchivoOcupacionCarrilesController', ArchivoOcupacionCarrilesController);

    ArchivoOcupacionCarrilesController.$inject = ['ArchivosListControllerFactory', '$scope', 'pagingParams', 'ArchivoOcupacionCarriles', 'ocupacionCarriles', 'archivosListListener', 'inspeccionEntity'];

    function ArchivoOcupacionCarrilesController (ArchivosListControllerFactory, $scope, pagingParams, ArchivoOcupacionCarriles, ocupacionCarriles, archivosListListener, inspeccionEntity) {

        var ArchivosListController=ArchivosListControllerFactory.create($scope, pagingParams, ArchivoOcupacionCarriles, ocupacionCarriles, archivosListListener, inspeccionEntity);
        var controller=new ArchivosListController({
            entityName:"archivo-ocupacion-carriles",
            parentEntityType:"ocupacion-carriles",
            parentFilterParamName:"idOcupacionCarriles"
            
        });
        return controller;
    }
})();
