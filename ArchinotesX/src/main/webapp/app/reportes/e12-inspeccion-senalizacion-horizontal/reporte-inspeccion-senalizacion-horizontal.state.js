(function() {
    'use strict';

    angular
        .module('siccApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider.state('reporte-senalizacion-horizontal', {
            parent: 'reportes',
            url: '/reporte-senalizacion-horizontal',
            data: {
                authorities: ['ROLE_OPERADOR2', 'ROLE_CONSULTA_CONCESION', 'ROLE_CONSULTA_INTERVENTOR', 'ROLE_INTERVENTOR', 'ROLE_SUPERVISOR'],
                pageTitle: 'Reporte - Inspección de señalización horizontal'
            },
            views: {
                'content@': {
                    templateUrl: 'app/reportes/e12-inspeccion-senalizacion-horizontal/reporte-inspeccion-senalizacion-horizontal.html',
                    controller: 'ReportesMantenimientoController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                service: 'InspeccionSenalizacionHorizontalReporteService',
                csvNamePrefix: function() {
                    return 'reporte_e12_';
                }
            }
        });
    }
})();
