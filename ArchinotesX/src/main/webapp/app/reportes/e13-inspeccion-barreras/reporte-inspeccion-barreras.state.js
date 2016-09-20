(function() {
    'use strict';

    angular
        .module('siccApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider.state('reporte-inspeccion-barreras', {
            parent: 'reportes',
            url: '/reporte-inspeccion-barreras',
            data: {
                authorities: ['ROLE_OPERADOR2', 'ROLE_CONSULTA_CONCESION', 'ROLE_CONSULTA_INTERVENTOR', 'ROLE_INTERVENTOR', 'ROLE_SUPERVISOR'],
                pageTitle: 'Reporte - Inspección de barreras'
            },
            views: {
                'content@': {
                    templateUrl: 'app/reportes/e13-inspeccion-barreras/reporte-inspeccion-barreras.html',
                    controller: 'ReportesMantenimientoController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                service: 'InspeccionBarrerasReporteService',
                csvNamePrefix: function() {
                    return 'reporte_e13_';
                }
            }
        });
    }
})();
