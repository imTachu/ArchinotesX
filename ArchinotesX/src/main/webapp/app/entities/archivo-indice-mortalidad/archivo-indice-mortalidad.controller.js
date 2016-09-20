(function() {
    'use strict';

    angular
        .module('siccApp')
        .controller('ArchivoIndiceMortalidadController', ArchivoIndiceMortalidadController);

    ArchivoIndiceMortalidadController.$inject = ['ArchivosListControllerFactory', '$scope', 'pagingParams', 'ArchivoIndiceMortalidad', 'indiceMortalidad', 'archivosListListener'];

    function ArchivoIndiceMortalidadController (ArchivosListControllerFactory, $scope, pagingParams, ArchivoIndiceMortalidad, indiceMortalidad, archivosListListener) {

        var ArchivosListController=ArchivosListControllerFactory.create($scope, pagingParams, ArchivoIndiceMortalidad, indiceMortalidad, archivosListListener);
        var controller=new ArchivosListController({
            entityName:"archivo-indice-mortalidad",
            parentEntityType:"indice-mortalidad",
            parentFilterParamName:"idIndiceMortalidad"
            
        });
        return controller;
    }
})();
