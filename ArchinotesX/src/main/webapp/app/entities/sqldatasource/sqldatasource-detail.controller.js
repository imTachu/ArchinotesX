(function() {
    'use strict';

    angular
        .module('archinotesxApp')
        .controller('SQLDatasourceDetailController', SQLDatasourceDetailController);

    SQLDatasourceDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'entity', 'SQLDatasource', 'InfraestructuraAfectada', 'CausaSQLDatasource', 'TipoSQLDatasource', 'FactorClimatologico', 'TipoNovedadSQLDatasource', 'Tramo'];

    function SQLDatasourceDetailController($scope, $rootScope, $stateParams, entity, SQLDatasource, InfraestructuraAfectada, CausaSQLDatasource, TipoSQLDatasource, FactorClimatologico, TipoNovedadSQLDatasource, Tramo) {
        var vm = this;
        vm.sqldatasource = entity;
        
        var unsubscribe = $rootScope.$on('archinotesxApp:sqldatasourceUpdate', function(event, result) {
            vm.sqldatasource = result;
        });
        $scope.$on('$destroy', unsubscribe);

    }
})();
