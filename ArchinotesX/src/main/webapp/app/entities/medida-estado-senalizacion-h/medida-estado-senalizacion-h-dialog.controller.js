(function() {
    'use strict';

    angular
        .module('archinotesxApp')
        .controller('MedidaEstadoSenalizacionHDialogController', MedidaEstadoSenalizacionHDialogController);

    MedidaEstadoSenalizacionHDialogController.$inject = ['$filter', '$state','DialogWithParentControllerFactory', '$scope', 'entity', 'MedidaEstadoSenalizacionH', 'estadoEntity', 'DateUtils'];

    function MedidaEstadoSenalizacionHDialogController ($filter, $state, DialogWithParentControllerFactory, $scope, entity, MedidaEstadoSenalizacionH, estadoEntity, DateUtils) {
        
        var EntityDialogController=DialogWithParentControllerFactory.create($scope, MedidaEstadoSenalizacionH, entity, estadoEntity);
        EntityDialogController.prototype=angular.extend(EntityDialogController.prototype,{
            beforeSave:function(){
                //var vm=this;
                entity.medidaDeEstado = estadoEntity;
            },
            onSaveSuccess : function(result){
                var vm=this;
                var entityName=vm.entityName;
                var entityCamelCase=$filter('hyphenToCamelCase')(entityName);
                //console.log('onSaveSuccess emit name: '+'archinotesxApp:'+entityCamelCase+'Update');
                $scope.$emit('archinotesxApp:'+entityCamelCase+'Update', result);
                $state.go(entityName);
                //$scope.$emit('archinotesxApp:medidaEstadoSenalizacionHUpdate', result);
                //$state.go('medida-estado-senalizacion-h.edit', {id_medida_senalizacion_h: result.id});
                vm.isSaving = false;
            }

        });

        
        var controller=new EntityDialogController({
            entityName:"medida-estado-senalizacion-h",
            withFinalizeState:false,
            withBackButton:true
        });
        return controller;
    }
})();
