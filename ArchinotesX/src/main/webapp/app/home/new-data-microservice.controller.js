(function (){
    'use strict';

    angular
        .module('archinotesxApp')
        .controller('NewMicroserviceController', NewMicroserviceController);

    NewMicroserviceController.$inject = ['DataMicroservice',  '$uibModalInstance', 'SQLDatasource', '$scope', '$http'];

    function NewMicroserviceController(DataMicroservice, $uibModalInstance, SQLDatasource, $scope, $http){
        var vm = this;
        getSQLDatasource();
        vm.name = "";
        vm.datasource = "";
        vm.table = "";

        $scope.$watchGroup(['vm.name', 'vm.endpoint'], function(){
           vm.endpoint = "/api/"+ vm.name;
        });

        vm.microserviceNew = function(){
            DataMicroservice.new({id: entity.id}).$promise.then(function(result){
                $uibModalInstance.close(result);
            });
        }

        function getSQLDatasource() {
            var aux =SQLDatasource.query({});
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
                // data: JSON.stringify(data)
                data: data
            }).then(function(result){
                vm.tables = result.data;
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
