(function() {
    'use strict';

    angular
        .module('siccApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider.state('reporte-inspeccion-baches', {
            parent: 'reportes',
            url: '/reporte-inspeccion-baches',
            data: {
                authorities: ['ROLE_OPERADOR2', 'ROLE_CONSULTA_CONCESION', 'ROLE_CONSULTA_INTERVENTOR', 'ROLE_INTERVENTOR', 'ROLE_SUPERVISOR'],
                pageTitle: 'Reporte - Inspección de baches'
            },
            views: {
                'content@': {
                    templateUrl: 'app/reportes/e06-inspeccion-baches/reporte-inspeccion-baches.html',
                    controller: 'ReportesMantenimientoController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                service: 'InspeccionBachesReporteService',
                csvNamePrefix: function() {
                    return 'reporte_e6_';
                }
            }
        });
    }
})();
