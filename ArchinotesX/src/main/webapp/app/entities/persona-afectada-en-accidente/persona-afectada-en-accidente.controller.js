(function() {
    'use strict';

    angular
        .module('archinotesxApp')
        .controller('PersonaAfectadaEnAccidenteController', PersonaAfectadaEnAccidenteController);

    PersonaAfectadaEnAccidenteController.$inject = ['ListWithParentControllerFactory', '$scope', 'pagingParams', 'PersonaAfectadaEnAccidente', 'accidente'];

    function PersonaAfectadaEnAccidenteController (ListWithParentControllerFactory, $scope, pagingParams, PersonaAfectadaEnAccidente, accidente) {
        var ListWithParentController=ListWithParentControllerFactory.create($scope, pagingParams, PersonaAfectadaEnAccidente, accidente);
        var controller=new ListWithParentController({
            title:"Personas afectadas",
            listItemCreateBtnLabel:"Registrar persona afectada",
            entityName:"persona-afectada-en-accidente",
            parentEntityType:"accidente",
            parentFilterParamName:"idAccidente",
            sortable:false,
            getColumnsConfig:function(controller){
                return {
                    fields:[
                        {
                            label:"ID", 
                            value:function(item){
                                return item.id;
                            }
                        },
                        {
                            label:"Nombre", 
                            value:function(item){
                                return item.nombre;
                            }
                        },
                        {
                            label:"Género", 
                            value:function(item){
                                return item.genero;
                            }
                        },
                        {
                            label:"Edad", 
                            value:function(item){
                                return item.edad;
                            }
                        },
                        {
                            label:"Tipo de afectación", 
                            value:function(item){
                                return item.tipoAfectacionDePersona && item.tipoAfectacionDePersona.tipoAfectacion;
                            }
                        }
                    ],
                    editLink:function(item){
                        return{
                            state:controller.getOptions().entityName+'.edit',
                            stateParams:{id_persona_afectada:item.id}
                        };   
                    }
                };
            }
        });
        
        return controller;
    }
})();
