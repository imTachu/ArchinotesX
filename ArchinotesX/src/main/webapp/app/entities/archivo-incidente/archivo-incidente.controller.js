(function() {
    'use strict';

    angular
        .module('archinotesxApp')
        .controller('ArchivoIncidenteController', ArchivoIncidenteController);

    ArchivoIncidenteController.$inject = ['ArchivosListControllerFactory', '$scope', 'pagingParams', 'ArchivoIncidente', 'incidente', 'archivosListListener'];

    function ArchivoIncidenteController (ArchivosListControllerFactory, $scope, pagingParams, ArchivoIncidente, incidente, archivosListListener) {

        var ArchivosListController=ArchivosListControllerFactory.create($scope, pagingParams, ArchivoIncidente, incidente, archivosListListener);
        var controller=new ArchivosListController({
            entityName:"archivo-incidente",
            parentEntityType:"incidente",
            parentFilterParamName:"idIncidente"
            
        });
        return controller;
    }
})();
