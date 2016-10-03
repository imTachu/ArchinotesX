(function () {
    'use strict';
    angular
        .module('archinotesxApp')
        .factory('EntityListControllerFactory', EntityListControllerFactory);

    EntityListControllerFactory.$inject = ['$state', 'ParseLinks', 'AlertService', 'paginationConstants', 'ENTITY_STATES'];

    function EntityListControllerFactory($state, ParseLinks, AlertService, paginationConstants, ENTITY_STATES) {
        function createController($scope, pagingParams, EntityResource, parentEntityInstance, customOptions) {
            var defaultOptions = {
                title: "Entities List",
                entityName: 'entity',
                listItemCreateBtnLabel: "Create",
                templateURLUIList: "",
                withBackButton: false,
                sortable: true,
                parentEntityType: '', //TODO throw si algunas opciones no se especifican
                parentFilterParamName: ''
            };
            var controllerOptions = angular.extend(defaultOptions, customOptions || {});

            function EntityListController(instanceOptions) {

                var vm = this; //TODO encapsular metodos y props para no sobrecargar el scope en el controller
                vm.loadPage = vm.loadPageAt;
                vm.predicate = pagingParams.predicate;
                vm.reverse = pagingParams.ascending;
                vm.transition = vm.transitionToCurrentState;
                vm.totalItems = null;
                vm.numberOfPages = null;
                vm.itemsPerPage = pagingParams.size;
                vm.changeItemsPerPage = vm.changeItemsPerPage;

                var allOptions = angular.extend(controllerOptions, instanceOptions || {});
                vm.getOptions = function () {
                    return allOptions;
                };

                vm.postConstructor();
                vm.loadAll();

            }

            EntityListController.prototype = {
                postConstructor: function () {

                },
                getTitle: function () {
                    return this.getOptions().title;
                },
                getQueryAllReqParams: function () {
                    var requiredParams = {
                        page: pagingParams.page - 1,
                        size: this.itemsPerPage,
                        search: this.currentSearch,
                        sort: this._makeSortRequestParam()
                    };

                    var paramParentEntityName = this.getOptions().parentFilterParamName;
                    if (paramParentEntityName)
                        requiredParams[paramParentEntityName] = parentEntityInstance.id;

                    var extraParams = this.addExtraQueryAllReqParams(requiredParams);

                    return angular.extend(requiredParams, extraParams || {});
                },
                addExtraQueryAllReqParams: function (requiredParams) {
                    return {};
                },
                preLoadAllRequest: function () {

                },
                loadAll: function () {
                    this.preLoadAllRequest();
                    var queryParams = this.getQueryAllReqParams();
                    EntityResource.query(queryParams, this.onLoadAllSuccess.bind(this), this.onLoadAllError.bind(this));
                },
                onLoadAllSuccess: function onSuccess(data, headers) {
                    this.links = ParseLinks.parse(headers('link'));
                    this.totalItems = headers('X-Total-Count');
                    this.queryCount = this.totalItems;
                    this.entitiesData = data;
                    this.page = pagingParams.page;
                    this.numberOfPages = Math.ceil(this.totalItems / this.itemsPerPage);
                    this.postLoadAllSuccess(data, headers);
                },
                postLoadAllSuccess: function (data, headers) {

                },
                onLoadAllError: function (error) {
                    AlertService.error(error.data.message);
                },
                _makeSortRequestParam: function () {
                    var result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
                    if (this.predicate !== 'id') {
                        result.push('id');
                    }
                    return result;
                },
                transitionToCurrentState: function () {
                    $state.go($state.$current, {
                        page: this.page,
                        sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc'),
                        search: this.currentSearch,
                        size: this.itemsPerPage
                    });
                },
                loadPageAt: function (page) {
                    this.page = page;
                    this.transition();
                },
                changeItemsPerPage: function (num) {
                    this.itemsPerPage = num;
                    this.transition();
                },
                isListItemFinalizedEntity: function (entity) {
                    var isInstanceFinalized = entity.estado && entity.estado === ENTITY_STATES.FINISH_STATE;
                    if (parentEntityInstance) {
                        var isParentFinalized = parentEntityInstance.estado && parentEntityInstance.estado === ENTITY_STATES.FINISH_STATE;
                        return isParentFinalized || isInstanceFinalized;
                    }
                    return isInstanceFinalized;
                },
                isEditableList: function () {
                    if (parentEntityInstance) {
                        var isParentFinalized = parentEntityInstance.estado && parentEntityInstance.estado === ENTITY_STATES.FINISH_STATE;
                        return !isParentFinalized;
                    }
                    return true;
                },

                getEntityStateNameBase: function () {
                    return this.getOptions().entityName;
                },
                goToListItemCreate: function () {
                    var createStateName = this.getEntityStateNameBase() + '.new';
                    $state.go(createStateName);
                },

                getCreateBtnLabel: function () {
                    return this.getOptions().listItemCreateBtnLabel;
                },

                getUIListTemplateURL: function () {
                    var options = this.getOptions();
                    if (options.templateURLUIList)
                        return options.templateURLUIList;
                    else {
                        return "app/entities/_components/entity-list/templates/list-table-base.html";
                    }
                },
                hasBackButton: function () {
                    return this.getOptions().withBackButton;
                },
                isSortableList: function () {
                    return this.getOptions().sortable;
                },

                goToBack: function () {
                    var vm = this;
                    var parentEntityType = vm.getOptions().parentEntityType;
                    if (parentEntityType) {
                        var stateGoName = parentEntityType + '.edit';
                        $state.go(stateGoName);
                    }
                },

                doEmptyList: function () {
                    this.entitiesData = [];
                },
                getListFields: function () {
                    return this.getOptions().getColumnsConfig(this);
                }
            };

            return EntityListController;
        }

        return {
            create: createController
        };

    }
})();
