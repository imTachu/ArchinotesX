(function() {
    'use strict';

    angular
        .module('archinotesxApp')
        .controller('ArchivoAccidenteController', ArchivoAccidenteController);

    ArchivoAccidenteController.$inject = ['ArchivosListControllerFactory', '$scope', 'pagingParams', 'ArchivoAccidente', 'accidente', 'archivosListListener'];

    function ArchivoAccidenteController (ArchivosListControllerFactory, $scope, pagingParams, ArchivoAccidente, accidente, archivosListListener) {

        var ArchivosListController=ArchivosListControllerFactory.create($scope, pagingParams, ArchivoAccidente, accidente, archivosListListener);
        var controller=new ArchivosListController({
            entityName:"archivo-accidente",
            parentEntityType:"accidente",
            parentFilterParamName:"idAccidente"
            
        });
        return controller;
    }
})();
