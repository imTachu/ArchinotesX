(function() {
    'use strict';

    angular
        .module('siccApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider.state('reporte-inspeccion-margenes', {
            parent: 'reportes',
            url: '/reporte-inspeccion-margenes',
            data: {
                authorities: ['ROLE_OPERADOR2', 'ROLE_CONSULTA_CONCESION', 'ROLE_CONSULTA_INTERVENTOR', 'ROLE_INTERVENTOR', 'ROLE_SUPERVISOR'],
                pageTitle: 'Reporte - Inspección de márgenes'
            },
            views: {
                'content@': {
                    templateUrl: 'app/reportes/e08-inspeccion-margenes/reporte-inspeccion-margenes.html',
                    controller: 'ReportesMantenimientoController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                service: 'InspeccionMargenesReporteService',
                csvNamePrefix: function() {
                    return 'reporte_e8_';
                }
            }
        });
    }
})();
