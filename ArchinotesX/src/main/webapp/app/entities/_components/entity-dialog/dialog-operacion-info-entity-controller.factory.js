(function() {
    'use strict';
    angular
        .module('siccApp')
        .factory('DialogOperationInfoEntityControllerFactory', DialogOperationInfoEntityControllerFactory);

    DialogOperationInfoEntityControllerFactory.$inject = ['$filter', '$state', 'DialogWithParentControllerFactory', 'ENTITY_STATES', 'INSPECTION_STATES_STATUSES'];

    function DialogOperationInfoEntityControllerFactory ($filter, $state, DialogWithParentControllerFactory, ENTITY_STATES, INSPECTION_STATES_STATUSES) {
        function createController($scope, EntityResource, entity, parentEntity, customOptions){
            var controllerOptions=angular.extend({
                entityName:'entity',
                withFinalizeState:false,
                templateURLUIDialog:"",
                withBackButton:true
            },customOptions || {});
            var DialogOperationInfoEntityController=DialogWithParentControllerFactory.create($scope, EntityResource, entity, parentEntity, controllerOptions);
            DialogOperationInfoEntityController.prototype.postConstructor=function(){
                var vm=this;
                vm.parentEntity=parentEntity;
            };

            DialogOperationInfoEntityController.prototype.onSaveSuccess = function(result){
                
                var vm=this;
                var entityName=vm.entityName;
                var entityCamelCase=$filter('hyphenToCamelCase')(entityName);
                //console.log('onSaveSuccess emit name: '+'siccApp:'+entityCamelCase+'Update');
                $scope.$emit('siccApp:'+entityCamelCase+'Update', result);
                
                $state.go(entityName);
                vm.isSaving = false;
            };
            


            return DialogOperationInfoEntityController;
        }

        return {
            create:createController
        };

    }
})();
