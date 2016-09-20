(function() {
    'use strict';

    angular
        .module('siccApp')
        .controller('MedidaEstadoSenalizacionHController', MedidaEstadoSenalizacionHController);

    MedidaEstadoSenalizacionHController.$inject = ['$state', 'ListWithParentControllerFactory', '$scope', 'pagingParams', 'MedidaEstadoSenalizacionH', 'estadoSenalizacionHs', 'archivosListListener'];

    function MedidaEstadoSenalizacionHController ($state, ListWithParentControllerFactory, $scope, pagingParams, MedidaEstadoSenalizacionH, estadoSenalizacionHs, archivosListListener) {
        var ListWithParentController=ListWithParentControllerFactory.create($scope, pagingParams, MedidaEstadoSenalizacionH, estadoSenalizacionHs);
        ListWithParentController.prototype.postConstructor=function(){
            var vm=this;
            vm.attachListCallback();
        };
        ListWithParentController.prototype.transitionToCurrentState=function(){
            var vm=this;
            $state.go($state.$current, {
                index: vm.page,
                sortBy: vm.predicate + ',' + (vm.reverse ? 'asc' : 'desc'),
                query: vm.currentSearch,
                count:vm.itemsPerPage
            });
        };
        ListWithParentController.prototype.attachListCallback=function(){
            var vm=this;
            archivosListListener.attach(function(){
                vm.doEmptyList();
                vm.loadAll();
            });
        };
        var controller=new ListWithParentController({
            title:"Medidas Estado señalización horizontal",
            listItemCreateBtnLabel:"Registrar medida",
            entityName:"medida-estado-senalizacion-h",
            parentEntityType:"estado-senalizacion-h",
            parentFilterParamName:"idEstado",
            sortable:true,
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
                            sortBy:'medida', 
                            label:"Medida", 
                            value:function(item){
                                return item.medida;
                            }
                        }
                        /*{
                            sortBy:'tipoMedida', 
                            label:"Tipo de Medida", 
                            value:function(item){
                                return item.tipoMedida;
                            }
                        }*/
                    ],
                    editLink:function(item){
                        return{
                            state:controller.getOptions().entityName+'.edit',
                            stateParams:{id_medida_senalizacion_h:item.id},
                            isDisabled:function(){
                                return controller.isFinalizedEntity(item);
                            }
                        };   
                    },
                    deleteLink:function(item){
                        return{
                            state:controller.getOptions().entityName+'.delete',
                            stateParams:{id_medida_senalizacion_h:item.id},
                            isDisabled:function(){
                                return controller.isFinalizedEntity(item);
                            }
                        };   
                    }
                };
            }
        });
       
        
        return controller;
    }
})();
