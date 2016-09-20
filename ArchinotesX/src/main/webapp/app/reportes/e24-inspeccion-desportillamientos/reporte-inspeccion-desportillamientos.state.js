(function() {
    'use strict';

    angular
        .module('siccApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider.state('reporte-inspeccion-desportillamientos', {
            parent: 'reportes',
            url: '/reporte-inspeccion-desportillamientos',
            data: {
                authorities: ['ROLE_OPERADOR2', 'ROLE_CONSULTA_CONCESION', 'ROLE_CONSULTA_INTERVENTOR', 'ROLE_INTERVENTOR', 'ROLE_SUPERVISOR'],
                pageTitle: 'Reporte - Inspección de desportillamientos'
            },
            views: {
                'content@': {
                    templateUrl: 'app/reportes/e24-inspeccion-desportillamientos/reporte-inspeccion-desportillamientos.html',
                    controller: 'ReportesMantenimientoController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                service: 'InspeccionDesportillamientosReporteService',
                csvNamePrefix: function() {
                    return 'reporte_e24_';
                }
            }
        });
    }
})();
