(function () {
    'use strict';
    angular
        .module('archinotesxApp')
        .factory('EntityDialogControllerFactory', EntityDialogControllerFactory);

    EntityDialogControllerFactory.$inject = ['$filter', '$timeout', '$rootScope', '$state', '$stateParams', 'AlertService', 'ENTITY_STATES', '$http', '$uibModal'];

    function EntityDialogControllerFactory($filter, $timeout, $rootScope, $state, $stateParams, AlertService, ENTITY_STATES, $http, $uibModal) {
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
                openCalendar: function (date) {
                    var vm = this;
                    vm.datePickerOpenStatus[date] = true;
                },

                goToBack: function () {

                },

                isSaveDisabled: function () {
                    var vm = this;
                    if (vm.getOptions().withFinalizeState) {
                        return !vm.isEditableEntity() || vm.isInvalidToSave || vm.isSaving;
                    }
                    else {
                        var editForm = $scope.editForm;
                        return editForm.$invalid || vm.isSaving;
                    }
                },

                isConfirmationDisabled: function () {
                    var vm = this;
                    var editForm = $scope.editForm;
                    return !vm.isEditableEntity() || editForm.$invalid || vm.isSaving;
                },


                save: function () {

                    var vm = this;
                    //vm.beforeSave();
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
                    $state.go(entityName);
                    vm.isSaving = false;
                },

                /*onSaveToSendToConfirmation: function (result) {

                    var vm = this;
                    //console.log('onSaveToSendToConfirmation state go '+vm.entityName+'-confirmation');
                    $state.go(vm.entityName);
                    vm.isSaving = false;
                },*/

                onSaveError: function (error) {

                    var vm = this;
                    AlertService.error(error.data.message);
                    vm.isSaving = false;
                },


                /*saveAndSendToConfirm: function () {

                    var vm = this;
                    vm._save(this.onSaveToSendToConfirmation.bind(this), this.onSaveError.bind(this));
                },*/

                initCustomValidations: function () {

                },

                startWatcherIfCanToSaveEntity: function () {

                },

                testConnection: function () {
                    $http({
                        url: "/api/postgresql/test-connection",
                        dataType: "json",
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        data: entity
                    }).then(function (result) {
                        $uibModal.open({
                            templateUrl: 'app/entities/_components/entity-modal/templates/modal-connection.html',
                            controller: 'ModalConnectionController',
                            controllerAs: 'vm',
                            backdrop: false,
                            size: 'sm',
                        }).result.then(function(){
                            
                        }, function(){
                            
                        });
                    }, function (err) {
                        console.log(err);
                    });
                }


            };

            return EntityDialogController;
        }

        return {
            create: createController
        };

    }
})();
