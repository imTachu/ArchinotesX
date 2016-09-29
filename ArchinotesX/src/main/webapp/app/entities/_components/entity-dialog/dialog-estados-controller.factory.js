(function() {
    'use strict';
    angular
        .module('archinotesxApp')
        .factory('DialogEstadosControllerFactory', DialogEstadosControllerFactory);

    DialogEstadosControllerFactory.$inject = ['$filter', '$state', 'DialogWithParentControllerFactory', 'ENTITY_STATES', 'INSPECTION_STATES_STATUSES'];

    function DialogEstadosControllerFactory ($filter, $state, DialogWithParentControllerFactory, ENTITY_STATES, INSPECTION_STATES_STATUSES) {
        function createController($scope, EntityResource, entity, inspeccionEntity, customOptions){
            var controllerOptions=angular.extend({
                entityName:'entity',
                withFinalizeState:true,
                templateURLUIDialog:"",
                withBackButton:true
            },customOptions || {});
            var DialogEstadosController=DialogWithParentControllerFactory.create($scope, EntityResource, entity, inspeccionEntity, controllerOptions);
            DialogEstadosController.prototype.postConstructor=function(){
                var vm=this;
                vm.inspeccionEntity=inspeccionEntity;
            };
            DialogEstadosController.prototype.isEstadoInVerification=function(){
                return entity.estado && entity.estado===ENTITY_STATES.IN_VERIFICATION;
            };
            DialogEstadosController.prototype.getStateStatusLabel=function(){
                var vm=this;
                var statuses=INSPECTION_STATES_STATUSES;
                return vm.isEstadoInVerification()?statuses.VERIFICATION.label:statuses.INSPECTION.label;
            };
            DialogEstadosController.prototype.onSaveSuccess = function(result){
                var vm=this;
                var entityName=vm.entityName;
                var entityCamelCase=$filter('hyphenToCamelCase')(entityName);
                //console.log('onSaveSuccess emit name: '+'archinotesxApp:'+entityCamelCase+'Update');
                $scope.$emit('archinotesxApp:'+entityCamelCase+'Update', result);

                var successIdKeyParam='id_'+entityName.replace(/-/g,'_');
                //console.log('onSaveSuccess state go successIdKeyParam: '+successIdKeyParam);
                var params={};
                params[successIdKeyParam]=result.id;
                $state.go(entityName+'.edit', params);
                vm.isSaving = false;
            };
            DialogEstadosController.prototype.onSaveToSendToConfirmation = function(result){
                
                var vm=this;
                var entityName=vm.entityName;
                var successIdKeyParam='id_'+entityName.replace(/-/g,'_');
                //console.log('onSaveToSendToConfirmation state go '+vm.entityName+'-confirmation');
                var params={};
                params[successIdKeyParam]=result.id;
                $state.go(vm.entityName+'-confirmation', params);
                vm.isSaving = false;
            };


            return DialogEstadosController;
        }

        return {
            create:createController
        };

    }
})();
