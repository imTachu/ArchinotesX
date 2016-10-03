(function() {
    'use strict';

    angular
        .module('archinotesxApp')
        .controller('SQLDatasourceDetailController', SQLDatasourceDetailController);

    SQLDatasourceDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'entity', 'SQLDatasource'];

    function SQLDatasourceDetailController($scope, $rootScope, $stateParams, entity, SQLDatasource) {
        var vm = this;
        vm.sqldatasource = entity;
        
        var unsubscribe = $rootScope.$on('archinotesxApp:sqldatasourceUpdate', function(event, result) {
            vm.sqldatasource = result;
        });
        $scope.$on('$destroy', unsubscribe);

    }
})();
