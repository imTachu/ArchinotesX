(function() {
    'use strict';
    angular
        .module('archinotesxApp')
        .factory('ListWithParentControllerFactory', ListWithParentControllerFactory);

    ListWithParentControllerFactory.$inject = ['EntityListControllerFactory', '$state'];

    function ListWithParentControllerFactory (EntityListControllerFactory, $state) {
        function createController($scope, pagingParams, EntityResource, parentEntityInstance, customOptions){
            var controllerOptions=angular.extend({
                title:"Entities List",
                entityName:'entity',
                listItemCreateBtnLabel:"Registrar",
                templateURLUIList:"",
                withBackButton:true,
                sortable:true,
                parentEntityType:'', //TODO throw si algunas opciones no se especifican
                parentFilterParamName:''
            },customOptions || {});
            var ListWithParentController=EntityListControllerFactory.create($scope, pagingParams, EntityResource, parentEntityInstance, controllerOptions);
            ListWithParentController.prototype.postConstructor=function(){
                if(!this.getOptions().parentEntityType){
                    throw new Error('Debes especificar la opción "parentEntityType"');
                }
                if(!this.getOptions().parentFilterParamName){
                    throw new Error('Debes especificar la opción "parentFilterParamName"');
                }
            };
            ListWithParentController.prototype.transitionToCurrentState=function(){
                var vm=this;
                $state.go($state.$current, {
                    pagina: vm.page,
                    orden: vm.predicate + ',' + (vm.reverse ? 'asc' : 'desc'),
                    busqueda: vm.currentSearch,
                    limite:vm.itemsPerPage
                });
            };
            return ListWithParentController;
        }

        return {
            create:createController
        };

    }
})();
