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
                    'vm.sqldatasource.dataSourceName',
                    'vm.sqldatasource.host',
                    'vm.sqldatasource.port',
                    'vm.sqldatasource.dbName',
                    'vm.sqldatasource.username',
                    'vm.sqldatasource.password'
                ], function () {
                    vm.isInvalidToSave = false;
                    var entityForm = $scope.editForm;
                    if (!entityForm || entityForm.dataSourceName.$invalid ||
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

        // vm.testConnection = function(){
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

        var controller = new EntityDialogController({
            entityName: "sqldatasource",
        });
        return controller;
    }
})();

