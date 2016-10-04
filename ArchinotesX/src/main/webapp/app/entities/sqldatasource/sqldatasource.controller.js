(function () {
    'use strict';

    angular
        .module('archinotesxApp')
        .controller('SQLDatasourceController', SQLDatasourceController);

    SQLDatasourceController.$inject = ['$filter', 'EntityListControllerFactory', '$scope', 'pagingParams', 'SQLDatasource'];

    function SQLDatasourceController($filter, EntityListControllerFactory, $scope, pagingParams, SQLDatasource) {
        var EntityListController = EntityListControllerFactory.create($scope, pagingParams, SQLDatasource);
        var controller = new EntityListController({
            title: "SQL Datasources",
            entityName: "sqldatasource",
            sortable: true,
            getColumnsConfig: function (controller) {
                return {
                    fields: [
                        {
                            sortBy: 'name',
                            label: "Name",
                            value: function (item) {
                                return item.name;
                            }
                        },
                        {
                            label: "Connection Type",
                            value: function () {
                                return "PostgreSQL";
                            }
                        },
                        {
                            sortBy: 'host',
                            label: "Host",
                            value: function (item) {
                                return item.host;
                            }
                        },
                        {
                            sortBy: 'dbName',
                            label: "DB Name",
                            value: function (item) {
                                return item.dbName;
                            }
                        },
                        {
                            sortBy: 'username',
                            label: "Username",
                            value: function (item) {
                                return item.username;
                            }
                        },
                    ],
                    detailLink: function (item) {
                        return {
                            state: 'sqldatasource-detail',
                            stateParams: {id: item.id},
                            roles: 'ROLE_REFERENCE_ARCHITECT'
                        };
                    },
                    editLink: function (item) {
                        return {
                            state: controller.getOptions().entityName + '.edit',
                            stateParams: {id: item.id},
                            isDisabled: function () {
                                return controller.isFinalizedEntity(item);
                            }
                        };
                    },
                    deleteLink: function (item) {
                        return {
                            state: controller.getOptions().entityName + '.delete',
                            stateParams: {id: item.id},
                            value: item.dataMicroservices
                        };
                    }
                };
            }
        });
        return controller;
    }
})();
