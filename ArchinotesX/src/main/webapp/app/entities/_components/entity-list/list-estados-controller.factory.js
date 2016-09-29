(function() {
    'use strict';
    angular
        .module('archinotesxApp')
        .factory('EstadosListControllerFactory', EstadosListControllerFactory);

    EstadosListControllerFactory.$inject = ['ListWithParentControllerFactory', '$state'];

    function EstadosListControllerFactory (ListWithParentControllerFactory, $state) {
        function createController($scope, pagingParams, EntityResource, parentEntityInstance, customOptions){
            var controllerOptions=angular.extend({
                title:"Estados de inspección",
                entityName:'entity',
                listItemCreateBtnLabel:"Crear Estado",
                templateURLUIList:"",
                withBackButton:true,
                sortable:true,
                parentEntityType:'', //TODO throw si algunas opciones no se especifican
                parentFilterParamName:'idInspeccion'
            },customOptions || {});
            var EstadosListController=ListWithParentControllerFactory.create($scope, pagingParams, EntityResource, parentEntityInstance, controllerOptions);
            return EstadosListController;
        }

        return {
            create:createController
        };

    }
})();
