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
        vm.confirmDelete = function (id) {
            SQLDatasource.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        };
    }
})();
