(function() {
    'use strict';
    angular
        .module('siccApp')
        .factory('ArchivosListControllerFactory', ArchivosListControllerFactory);

    ArchivosListControllerFactory.$inject = ['$filter', 'EntityListControllerFactory', '$state', 'ENTITY_STATES'];

    function ArchivosListControllerFactory ($filter, EntityListControllerFactory, $state, ENTITY_STATES) {
        function createController($scope, pagingParams, EntityResource, parentEntityInstance, archivosListListener, inspeccionEntity, customOptions){

            var controllerOptions=angular.extend({
                title:"Archivos",
                entityName:'entity',
                listItemCreateBtnLabel:"Agregar Archivos",
                withBackButton:true,
                sortable:true,
                parentEntityType:'', //TODO throw si algunas opciones no se especifican
                parentFilterParamName:'',
                
                getColumnsConfig:function(controller){
                    return {
                        fields:[
                            {
                                sortBy:'id', 
                                label:"ID", 
                                value:function(item){
                                    return item.id;
                                }
                            },
                            {
                                sortBy:'nombre', 
                                label:"Nombre de archivo", 
                                value:function(item){
                                    return item.nombre;
                                }
                            },
                            {
                                sortBy:'fechaDeRegistro', 
                                label:"Fecha De Registro", 
                                value:function(item){
                                    return $filter('date')(item.fechaDeRegistro, 'medium');
                                }
                            },
                            {
                                sortBy:'ubicacion', 
                                label:"Ubicacion", 
                                value:function(item){
                                    return item.ubicacion;
                                },
                                linkExternal:function(item){
                                    return{
                                        text:'Ir al archivo',
                                        url:item.ubicacion
                                    };   
                                }
                            }
                        ],
                        deleteLink:function(item){
                            return{
                                state:controller.getOptions().entityName+'.delete',
                                stateParams:{id_archivo:item.id}
                            };   
                        }
                    };
                }
            } || customOptions || {});
            
            var ArchivosListController=EntityListControllerFactory.create($scope, pagingParams, EntityResource, parentEntityInstance, controllerOptions);
            ArchivosListController.prototype.postConstructor=function(){
                if(!this.getOptions().parentEntityType){
                    throw new Error('Debes especificar la opción "parentEntityType"');
                }
                if(!this.getOptions().parentFilterParamName){
                    throw new Error('Debes especificar la opción "parentFilterParamName"');
                }
                this.attachListCallback();
            };
            ArchivosListController.prototype.transitionToCurrentState=function(){
                var vm=this;
                $state.go($state.$current, {
                    filesPage: vm.page,
                    filesSort: vm.predicate + ',' + (vm.reverse ? 'asc' : 'desc'),
                    filesSearch: vm.currentSearch,
                    filesCount:vm.itemsPerPage
                });
            };
            ArchivosListController.prototype.attachListCallback=function(){
                var vm=this;
                archivosListListener.attach(function(){
                    vm.doEmptyList();
                    vm.loadAll();
                });
            };
            ArchivosListController.prototype.goToListItemCreate=function(){
                var vm=this;
                var createStateName=vm.getEntityStateNameBase()+'.upload-file';
                $state.go(createStateName);
            };
            ArchivosListController.prototype.isEditableList=function(){
                var isEditable=true;
                var isInpspeccionFinalized=false;
                var isParentFinalized=false;
                if(inspeccionEntity){
                    isInpspeccionFinalized=inspeccionEntity.estado && inspeccionEntity.estado===ENTITY_STATES.FINISH_STATE;
                }
                if(parentEntityInstance){
                    isParentFinalized=parentEntityInstance.estado && parentEntityInstance.estado===ENTITY_STATES.FINISH_STATE;
                }
                return isEditable && !isParentFinalized && !isInpspeccionFinalized;
            };

            ArchivosListController.prototype.isListItemFinalizedEntity=function(entity){
                var isInstanceFinalized=entity.estado && entity.estado===ENTITY_STATES.FINISH_STATE;
                var isParentFinalized=false;
                var isInpspeccionFinalized=false;
                if(parentEntityInstance){
                    isParentFinalized=parentEntityInstance.estado && parentEntityInstance.estado===ENTITY_STATES.FINISH_STATE;
                }
                if(inspeccionEntity){
                    isInpspeccionFinalized=inspeccionEntity.estado && inspeccionEntity.estado===ENTITY_STATES.FINISH_STATE;
                }
                return isInstanceFinalized || isParentFinalized || isInpspeccionFinalized;
            };
            return ArchivosListController;
        }

        return {
            create:createController
        };

    }
})();
