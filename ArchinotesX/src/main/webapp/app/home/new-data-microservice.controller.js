(function (){
    'use strict';

    angular
        .module('archinotesxApp')
        .controller('NewMicroserviceController', NewMicroserviceController);

    NewMicroserviceController.$inject = ['DataMicroservice',  '$uibModalInstance', 'SQLDatasource', '$scope', '$http'];

    function NewMicroserviceController(DataMicroservice, $uibModalInstance, SQLDatasource, $scope, $http){
        var vm = this;
        vm.tablesReady = false;
        getSQLDatasource();
        vm.name = "";
        vm.datasource = "";
        vm.tableName = "";

        $scope.$watchGroup(['vm.tableName', 'vm.endpoint'], function(){
           vm.endpoint = "/api/"+ vm.tableName;
        });

        vm.microserviceNew = function(){
            var data =  JSON.stringify({
                name: vm.name,
                endpoint: vm.endpoint,
                tableName: vm.tableName
            });
            $http({
                url: "/api/datamicroservices",
                dataType: "json",
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                params: {
                    projectId: 1,
                    datasourceId: vm.datasource.id
                },
                data: data
            }).then(function(result){
                $uibModalInstance.close(result);
            }, function(err){
                console.log(err);
            });
        }

        function getSQLDatasource() {
            var aux = SQLDatasource.query({});
            aux.$promise.then(function(result){
                vm.SQLDatasources = result;
            });
        }

        vm.getTables = function(){
            var data =  JSON.stringify({
                name: vm.datasource.name,
                host: vm.datasource.host,
                dbName: vm.datasource.dbName,
                username: vm.datasource.username,
                password: vm.datasource.password,
                port: vm.datasource.port
            });
            $http({
                url: "/api/postgresql/get-tables",
                dataType: "json",
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                data: data
            }).then(function(result){
                vm.tables = result.data;
                vm.tablesReady = true;
            }, function(err){
                console.log(err);
            });
        }

        vm.clear = function() {
            $uibModalInstance.dismiss('cancel');
            console.log("cancelar");
        };
    }
})();
