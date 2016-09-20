(function() {
    'use strict';
    angular
        .module('siccApp')
        .factory('DialogDetailsEntityControllerFactory', DialogDetailsEntityControllerFactory);

    DialogDetailsEntityControllerFactory.$inject = ['$filter', '$state', 'DialogWithParentControllerFactory', 'ENTITY_STATES', 'INSPECTION_STATES_STATUSES'];

    function DialogDetailsEntityControllerFactory ($filter, $state, DialogWithParentControllerFactory, ENTITY_STATES, INSPECTION_STATES_STATUSES) {
        function createController($scope, EntityResource, entity, parentEntity, customOptions){
            var controllerOptions=angular.extend({
                entityName:'entity',
                withFinalizeState:false,
                templateURLUIDialog:"",
                withBackButton:true
            },customOptions || {});
            var DialogDetailsEntityController=DialogWithParentControllerFactory.create($scope, EntityResource, entity, parentEntity, controllerOptions);
            DialogDetailsEntityController.prototype.postConstructor=function(){
                var vm=this;
                vm.parentEntity=parentEntity;
            };

            DialogDetailsEntityController.prototype.onSaveSuccess = function(result){
                
                var vm=this;
                var entityName=vm.entityName;
                var entityCamelCase=$filter('hyphenToCamelCase')(entityName);
                //console.log('onSaveSuccess emit name: '+'siccApp:'+entityCamelCase+'Update');
                $scope.$emit('siccApp:'+entityCamelCase+'Update', result);

                var params={};
                params['id_detalle']=result.id;
                $state.go(entityName+'.edit', params);
                vm.isSaving = false;
            };
            


            return DialogDetailsEntityController;
        }

        return {
            create:createController
        };

    }
})();
