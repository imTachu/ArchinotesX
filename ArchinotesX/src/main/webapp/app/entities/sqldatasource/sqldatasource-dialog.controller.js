(function () {
    'use strict';
    angular
        .module('archinotesxApp')
        .controller('SQLDatasourceDialogController', SQLDatasourceDialogController);

    SQLDatasourceDialogController.$inject = ['EntityDialogControllerFactory', '$scope', 'entity', 'SQLDatasource', 'DateUtils'];

    function SQLDatasourceDialogController(EntityDialogControllerFactory, $scope, entity, SQLDatasource, DateUtils) {
        var EntityDialogController = EntityDialogControllerFactory.create($scope, SQLDatasource, entity);
        EntityDialogController.prototype = angular.extend(EntityDialogController.prototype, {

            postConstructor: function () {
                var vm = this;
            },
            startWatcherIfCanToSaveEntity: function () {

                var vm = this;
                $scope.$watchGroup([
                    'vm.sqldatasource.name',
                    'vm.sqldatasource.host',
                    'vm.sqldatasource.port',
                    'vm.sqldatasource.dbName',
                    'vm.sqldatasource.username',
                    'vm.sqldatasource.password'
                ], function () {
                    vm.isInvalidToSave = false;
                    var entityForm = $scope.editForm;
                    if (!entityForm || entityForm.name.$invalid ||
                        entityForm.host.$invalid ||
                        entityForm.port.$invalid ||
                        entityForm.dbName.$invalid ||
                        entityForm.username.$invalid ||
                        entityForm.password.$invalid
                    ) {
                        vm.isInvalidToSave = true;
                    }
                });
            },
            createSQL: function(flag) {
                var vm = this;
                vm.sql = flag;
            }
        });

        var controller = new EntityDialogController({
            entityName: "sqldatasource",
            withFinalizeState: true
        });
        return controller;
    }
})();

