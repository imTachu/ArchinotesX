(function() {
    'use strict';

    angular
        .module('archinotesxApp')
        .controller('ArchivoColaPeajeController', ArchivoColaPeajeController);

    ArchivoColaPeajeController.$inject = ['ArchivosListControllerFactory', '$scope', 'pagingParams', 'ArchivoColaPeaje', 'colaPeaje', 'archivosListListener'];

    function ArchivoColaPeajeController (ArchivosListControllerFactory, $scope, pagingParams, ArchivoColaPeaje, colaPeaje, archivosListListener) {

        var ArchivosListController=ArchivosListControllerFactory.create($scope, pagingParams, ArchivoColaPeaje, colaPeaje, archivosListListener);
        var controller=new ArchivosListController({
            entityName:"archivo-cola-peaje",
            parentEntityType:"cola-peaje",
            parentFilterParamName:"idColaPeaje"
            
        });
        return controller;
    }
})();
