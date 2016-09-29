(function() {
    'use strict';
    angular
        .module('archinotesxApp')
        .factory('DialogWithParentControllerFactory', DialogWithParentControllerFactory);

    DialogWithParentControllerFactory.$inject = ['$state', 'EntityDialogControllerFactory', 'ENTITY_STATES'];

    function DialogWithParentControllerFactory ($state, EntityDialogControllerFactory, ENTITY_STATES) {
        function createController($scope, EntityResource, entity, parentEntityInstance, customOptions){
            var controllerOptions=angular.extend({                entityName:'entity',
                withFinalizeState:true,
                templateURLUIDialog:"",
                withBackButton:true

            },customOptions || {});
            var DialogWithParentController=EntityDialogControllerFactory.create($scope, EntityResource, entity, controllerOptions);
            DialogWithParentController.prototype.goToBack=function(){
                var vm=this;
                var entityName=vm.getOptions().entityName;
                if(entityName){
                    var stateGoName=entityName;
                    $state.go(stateGoName);
                }
            };
            DialogWithParentController.prototype.isEditableEntity=function(){
                var isInstanceEditable=!(entity.estado && entity.estado===ENTITY_STATES.FINISH_STATE);
                if(parentEntityInstance){
                    var isParentEditable=!(parentEntityInstance.estado && parentEntityInstance.estado===ENTITY_STATES.FINISH_STATE);
                    return isParentEditable && isInstanceEditable;    
                }
                return isInstanceEditable;
            };
            return DialogWithParentController;
        }

        return {
            create:createController
        };

    }
})();
