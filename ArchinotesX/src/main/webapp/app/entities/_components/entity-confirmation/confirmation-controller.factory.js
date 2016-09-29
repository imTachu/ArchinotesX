(function() {
    'use strict';

    angular
        .module('archinotesxApp')
        .factory('ConfirmationControllerFactory', ConfirmationControllerFactory);

    ConfirmationControllerFactory.$inject = ['$filter', '$rootScope', 'AlertService', '$stateParams', '$state', 'Tramo', 'ENTITY_STATES'];

    function ConfirmationControllerFactory($filter, $rootScope, AlertService, $stateParams, $state, Tramo, ENTITY_STATES) {
        function createController($scope, customOptions) {
            var defaultOptions = {
                entity: '',
                entityService: '',
                entityName: '',
                parentEntity: ''
            };

            var controllerOptions = angular.extend(defaultOptions, customOptions || {});

            function ConfirmationController() {
                var vm = this;

                var allOptions = controllerOptions;

                vm.getOptions = function() {
                    return allOptions;
                };

                vm.entity = allOptions.entity;
                vm.entityName = allOptions.entityName;
                vm.entityService = allOptions.entityService;
                vm.parentEntity = allOptions.parentEntity;

                vm.entityCamelCase = $filter('hyphenToCamelCase')(vm.entityName);
                vm.entityUnderscore = $filter('hyphenToUnderscore')(vm.entityName);

                vm[vm.entityCamelCase] = vm.entity;

                vm.entityID = vm.entity.id;
                vm.isSaving = false;

                var unsubscribe = $rootScope.$on('archinotesxApp:' + vm.entityCamelCase + 'Update', function(event, result) {
                    vm[vm.entityCamelCase] = result;
                });
                $scope.$on('$destroy', unsubscribe);

            }

            ConfirmationController.prototype = {
                checkState: function() {
                    var vm = this;
                    if (vm.entity.estado === ENTITY_STATES.FINISH_STATE) {
                        return true;
                    }
                },

                onFinalizeSuccess: function(result) {
                    var vm = this;
                    if (!vm.parentEntity) {
                        $scope.$emit('finalizar_' + vm.entityUnderscore + '', result);
                        vm.isSaving = false;
                    } else {
                        $state.go(vm.entityName, { id: vm.parentEntity.id });
                        vm.isSaving = false;
                    }
                },

                onFinalizeError: function(error) {
                    var vm = this;
                    AlertService.error(error.data.message);
                    vm.isSaving = false;
                },

                finalizeAndClose: function() {
                    var vm = this;
                    if (vm.entityID !== null) {
                        vm.isSaving = true;
                        vm.entityService.finalize(vm.entity, vm.onFinalizeSuccess.bind(vm), vm.onFinalizeError.bind(vm));
                    }
                },

                // Extra functions - buttons -  templates

                goBackToEditEntity: function() {
                    var vm = this;
                    if (!vm.parentEntity) {
                        $state.go('' + vm.entityName + '.edit', { id: vm.entityID });
                    } else {
                        var stateParamName = 'id_' + vm.entityUnderscore;

                        var params = {};
                        params[stateParamName] = vm.entityID;
                        $state.go('' + vm.entityName + '.edit', params);
                    }
                },

                getUIListTemplateURL: function() {
                    var vm = this;
                    return 'app/entities/' + vm.entityName + '/' + vm.entityName + '-confirmation.html';
                },

                // estado methods

                isForStateInspection: function() {
                    var vm = this;
                    if (vm.parentEntity) {
                        return !(vm.entity.estado && vm.entity.estado === ENTITY_STATES.IN_VERIFICATION); 
                    }
                }
            };

            return ConfirmationController;
        }

        return {
            create: createController
        };
    }
})();
