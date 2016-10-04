(function() {
    'use strict';

    angular
        .module('archinotesxApp')
        .controller('SQLDatasourceDeleteController',SQLDatasourceDeleteController);

    SQLDatasourceDeleteController.$inject = ['$uibModalInstance', 'entity', 'SQLDatasource'];

    function SQLDatasourceDeleteController($uibModalInstance, entity, SQLDatasource) {
        var vm = this;
        vm.sqldatasource = entity;
        vm.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };
        var data = JSON.stringify(entity);
        vm.confirmDelete = function (id) {
            SQLDatasource.delete({data},
                function () {
                    $uibModalInstance.close(true);
                }, function(err){
                    console.log(err);
                });
        };
    }
})();
