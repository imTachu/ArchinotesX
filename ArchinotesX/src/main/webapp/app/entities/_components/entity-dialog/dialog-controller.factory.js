(function () {
    'use strict';
    angular
        .module('archinotesxApp')
        .factory('EntityDialogControllerFactory', EntityDialogControllerFactory);

    EntityDialogControllerFactory.$inject = ['$filter', '$timeout', '$rootScope', '$state', '$stateParams', 'AlertService', 'ENTITY_STATES'];

    function EntityDialogControllerFactory($filter, $timeout, $rootScope, $state, $stateParams, AlertService, ENTITY_STATES) {
        function createController($scope, EntityResource, entity, customOptions) {
            var defaultOptions = {
                entityName: 'entity',
                withFinalizeState: true,
                withBackButton: false,
                templateURLUIDialog: ""
            };
            var controllerOptions = angular.extend(defaultOptions, customOptions || {});

            function EntityDialogController(instanceOptions) {
                var vm = this;
                var allOptions = angular.extend(controllerOptions, instanceOptions || {});
                vm.getOptions = function () {
                    return allOptions;
                };
                vm.entityName = vm.getOptions().entityName;
                var entityCamelCase = $filter('hyphenToCamelCase')(vm.entityName);

                vm[entityCamelCase] = entity;
                vm.entity = entity;
                vm.isInvalidToSave = false;
                vm.isSaving = false;
                vm.showUserToSaveMessage = false;
                vm.disableAllFormControls = false;
                vm.datePickerOpenStatus = {};
                vm.withBackButton = vm.getOptions().withBackButton;
                vm.withFinalizeState = vm.getOptions().withFinalizeState;


                if (this.getOptions().entityName === 'entity') {
                    throw new Error('Debes especificar la opción "entityName"');
                }
                vm.postConstructor();
            }

            EntityDialogController.prototype = {
                getScope: function () {
                    return $scope;
                },
                onTemplateLoaded: function () {
                    var vm = this;
                    vm.setFocus();
                    vm.initDatePickerFields();
                    vm.initCustomValidations();
                    vm.startWatcherIfCanToSaveEntity();
                    vm.disableAllFormControls = false;
                    $timeout(function () {
                        ///console.log(!vm.isEditableEntity());
                        vm.disableAllFormControls = !vm.isEditableEntity();
                    });
                },
                postConstructor: function () {
                },
                getUIFormFieldsTemplateURL: function () {
                    var options = this.getOptions();
                    if (options.templateURLUIDialog)
                        return options.templateURLUIDialog;
                    else {
                        var entityType = options.entityName;
                        return 'app/entities/' + entityType + '/' + entityType + '-dialog-fields.html';
                    }
                },
                clear: function () {
                    var entityName = this.entityName;
                    ////console.log('clear dialog base emit: '+'cancelar_'+entityName.replace(/-/g,'_'));
                    $scope.$emit('cancelar_' + entityName.replace(/-/g, '_'));
                },
                isEditableEntity: function () {
                    var isInstanceEditable = !(entity.estado && entity.estado === ENTITY_STATES.FINISH_STATE);
                    return isInstanceEditable;
                },

                initDatePickerFields: function () {
                },

                setFocus: function () {
                    $timeout(function () {
                        angular.element('.form-group:eq(1)>input').focus();
                    });
                },
                goToBack: function () {

                },

                save: function () {

                    var vm = this;
                    vm.beforeSave();
                    vm._save(this.onSaveSuccess.bind(this), this.onSaveError.bind(this));
                },

                beforeSave: function () {

                },

                _save: function (onSuccess, onError) {

                    var vm = this;
                    vm.isSaving = true;
                    if (entity.id !== null) {
                        entity.$update(onSuccess, onError);
                    } else {
                        entity.$save(onSuccess, onError);
                    }
                },
                onSaveSuccess: function (result) {

                    var vm = this;
                    var entityName = vm.entityName;
                    var entityCamelCase = $filter('hyphenToCamelCase')(entityName);
                    //console.log('onSaveSuccess emit name: '+'archinotesxApp:'+entityCamelCase+'Update');
                    $scope.$emit('archinotesxApp:' + entityCamelCase + 'Update', result);
                    $state.go(entityName + '.edit', {id: result.id});
                    vm.isSaving = false;
                },
                onSaveError: function (error) {

                    var vm = this;
                    AlertService.error(error.data.message);
                    vm.isSaving = false;
                },

                // testConnection: function(){
                //     var data =  JSON.stringify({
                //         name: vm.datasource.name,
                //         host: vm.datasource.host,
                //         dbName: vm.datasource.dbName,
                //         username: vm.datasource.username,
                //         password: vm.datasource.password,
                //         port: vm.datasource.port
                //     });
                //     $http({
                //         url: "/api/postgresql/test-connection",
                //         dataType: "json",
                //         method: "POST",
                //         headers: {
                //             "Content-Type": "application/json"
                //         },
                //         data: data
                //     }).then(function(result){
                //         debugger
                //     }, function(err){
                //         console.log(err);
                //     });
                // }

                initCustomValidations: function () {

                },

                startWatcherIfCanToSaveEntity: function () {

                }


            };

            return EntityDialogController;
        }

        return {
            create: createController
        };

    }
})();
